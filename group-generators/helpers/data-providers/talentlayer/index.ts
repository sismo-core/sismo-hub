import { BigNumber, ethers } from "ethers";
import {
  getReviewsByMinRatingQuery,
  getFinishedServicesByBuyerQuery,
  getFinishedServicesByTopicQuery,
  getUsersWithTalentLayerIdQuery,
  getUserTotalEarnedQuery,
} from "./queries";
import { Services, Users, Reviews, UserGains, UserGain, BuyerHandle } from "./types";
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
    buyerHandle: string,
    minimalAmountOfServices: number
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Services = await getFinishedServicesByBuyerQuery(
      this,
      buyerHandle
    );
    if (response.services.length >= minimalAmountOfServices) {
      dataProfiles[response.services[0].seller.address] = 1;
    }
    return dataProfiles;
  }

  public async didSellerServiceBuyer(
    {buyerHandle}: BuyerHandle,
    minimalAmountOfServices = 1
  ): Promise<FetchedData> {
    return this.processDidSellerServiceBuyer(
      buyerHandle,
      minimalAmountOfServices
    );
  }

  public async didSellerServiceBuyerCount(
    {buyerHandle}: BuyerHandle,
    minimalAmountOfServices = 1
  ): Promise<number> {
    return Object.keys(
      await this.processDidSellerServiceBuyer(
        buyerHandle,
        minimalAmountOfServices
      )
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
    const response: Services = await getFinishedServicesByTopicQuery(
      this,
      topic
    );
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
    numberOfTimes = 1
  ): Promise<FetchedData> {
    return this.processDidWorkOnTopic(topic, numberOfTimes);
  }

  public async didWorkOnTopicCount(
    topic: string,
    numberOfTimes = 1
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
    const response: UserGains = await getUserTotalEarnedQuery(
      this,
      userHandle,
      tokenSymbol
    );

    if (!response.userGains[0]) {
      return {};
    }

    const userGain: UserGain = response.userGains[0];
    const minimumEarningsInWei = ethers.utils.parseEther(
      minimumEarnings.toString()
    );

    if (BigNumber.from(userGain.totalGain).gte(minimumEarningsInWei)) {
      dataProfiles[userGain.user.address] = 1;
    }

    return dataProfiles;
  }

  public async didUserMinimalEarnedOfToken(
    userHandle: string,
    minimumEarnings = 1,
    tokenSymbol = "MATIC"
  ): Promise<FetchedData> {
    return this.processDidUserMinimalEarnedOfToken(
      userHandle,
      minimumEarnings,
      tokenSymbol
    );
  }

  public async didUserMinimalEarnedOfTokenCount(
    userHandle: string,
    minimumEarnings = 1,
    tokenSymbol = "MATIC"
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
    numberOfTimes = 1
  ): Promise<FetchedData> {
    return this.processDidWorkWithRating(minRating, numberOfTimes);
  }

  public async didWorkWithRatingCount(
    minRating: number,
    numberOfTimes = 1
  ): Promise<number> {
    return Object.keys(
      await this.processDidWorkWithRating(minRating, numberOfTimes)
    ).length;
  }
}
