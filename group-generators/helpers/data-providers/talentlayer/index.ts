import {
  getReviewsByMinRatingQuery,
  getServicesByBuyerQuery,
  getServicesByTopicQuery,
  getUsersWithTalentLayerIdQuery,
  getUserTotalEarnedQuery,
} from "./queries";
import { Services, Users, Reviews } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class TalentLayerProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/talentlayer/talent-layer-mumbai",
    });
  }

  /**
   * Get all users with a talent layer id
   */
  private async processUsersWithTalentLayerId(): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Users = await getUsersWithTalentLayerIdQuery(this);
    response.users.forEach((user) => {
      dataProfiles[user.address] = 1;
    });
    return dataProfiles;
  }

  public async getUsersWithTalentLayerId(): Promise<FetchedData> {
    return this.processUsersWithTalentLayerId();
  }

  public async getUsersWithTalentLayerIdCount(): Promise<number> {
    return Object.keys(await this.processUsersWithTalentLayerId()).length;
  }

  /**
   * Get Talent that worked with a buyer
   */
  private async processDidSellerServiceBuyer(
    buyer: string,
    minimalAmountOfServices: number
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Services = await getServicesByBuyerQuery(this, buyer);
    if (response.services.length >= minimalAmountOfServices) {
      dataProfiles[response.services[0].seller.address] = 1;
    }
    return dataProfiles;
  }

  public async didSellerServiceBuyer(
    buyer: string,
    minimalAmountOfServices: number
  ): Promise<FetchedData> {
    return this.processDidSellerServiceBuyer(buyer, minimalAmountOfServices);
  }

  public async didSellerServiceBuyerCount(
    buyer: string,
    minimalAmountOfServices: number
  ): Promise<number> {
    return Object.keys(
      await this.processDidSellerServiceBuyer(buyer, minimalAmountOfServices)
    ).length;
  }

  /**
   * Get Talent experienced in a topic
   */
  private async processDidWorkOnTopic(
    topic: string,
    numberOfTimes: number
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Services = await getServicesByTopicQuery(this, topic);
    const countByUser: { [address: string]: number } = {};

    response.services.forEach((service) => {
      countByUser[service.seller.address] =
        countByUser[service.seller.address] || 0 + 1;
    });

    Object.keys(countByUser).forEach((address) => {
      if (countByUser[address] >= numberOfTimes) {
        dataProfiles[address] = 1;
      }
    });
    return dataProfiles;
  }

  public async didWorkOnTopic(
    topic: string,
    numberOfTimes: number
  ): Promise<FetchedData> {
    return this.processDidWorkOnTopic(topic, numberOfTimes);
  }

  public async didWorkOnTopicCount(
    topic: string,
    numberOfTimes: number
  ): Promise<number> {
    return Object.keys(await this.processDidWorkOnTopic(topic, numberOfTimes))
      .length;
  }

  /**
   * Get Talent that earned a minium salary
   */
  private async processDidUserMinimalEarnedOfToken(
    userHandle: string,
    minimumEarnings: number,
    tokenSymbol: string
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Users = await getUserTotalEarnedQuery(this, userHandle);

    response.users.forEach((user) => {
      if (user.totalGains) {
        let totalGain = 0;
        user.totalGains.forEach((tg) => {
          if (tg.token.symbol === tokenSymbol && tg.totalGain > 0) {
            totalGain += tg.totalGain;
          }
        });
        if (totalGain >= minimumEarnings) {
          dataProfiles[user.address] = 1;
        }
      }
    });
    return dataProfiles;
  }

  public async didUserMinimalEarnedOfToken(
    userHandle: string,
    minimumEarnings: number,
    tokenSymbol: string
  ): Promise<FetchedData> {
    return this.processDidUserMinimalEarnedOfToken(
      userHandle,
      minimumEarnings,
      tokenSymbol
    );
  }

  public async didUserMinimalEarnedOfTokenCount(
    userHandle: string,
    minimumEarnings: number,
    tokenSymbol: string
  ): Promise<number> {
    return Object.keys(
      await this.processDidUserMinimalEarnedOfToken(
        userHandle,
        minimumEarnings,
        tokenSymbol
      )
    ).length;
  }

  /**
   * Get Talent having multiple rating with a defined minimum
   */
  private async processDidWorkWithRating(
    minRating: number,
    numberOfTimes: number
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Reviews = await getReviewsByMinRatingQuery(this, minRating);
    const countByUser: { [address: string]: number } = {};

    response.reviews.forEach((review) => {
      if (review.to.address == review.service.seller.address) {
        countByUser[review.to.address] =
          countByUser[review.to.address] || 0 + 1;
      }
    });

    Object.keys(countByUser).forEach((address) => {
      if (countByUser[address] >= numberOfTimes) {
        dataProfiles[address] = 1;
      }
    });
    return dataProfiles;
  }

  public async didWorkWithRating(
    minRating: number,
    numberOfTimes: number
  ): Promise<FetchedData> {
    return this.processDidWorkWithRating(minRating, numberOfTimes);
  }

  public async didWorkWithRatingCount(
    minRating: number,
    numberOfTimes: number
  ): Promise<number> {
    return Object.keys(
      await this.processDidWorkWithRating(minRating, numberOfTimes)
    ).length;
  }
}
