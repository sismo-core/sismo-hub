import { BigNumber, ethers } from "ethers";
import {
  getReviewsByMinRatingQuery,
  getFinishedServicesByBuyerQuery,
  getFinishedServicesByTopicQuery,
  getUsersWithTalentLayerIdQuery,
  getUserTotalEarnedQuery,
  getServicesInTimeframeQuery,
} from "./queries";
import {
  Services,
  Users,
  Reviews,
  UserGains,
  DidSellerServiceBuyer,
  DidWorkOnTopic,
  DidUserMinimalEarnedOfToken,
  DidWorkWithRating,
  AddressPayments,
  TalentOfTheMonth,
} from "./types";
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

  public async didSellerServiceBuyer({
    buyerHandle,
    minimalAmountOfServices = 1,
  }: DidSellerServiceBuyer): Promise<FetchedData> {
    return this.processDidSellerServiceBuyer(
      buyerHandle,
      minimalAmountOfServices
    );
  }

  public async didSellerServiceBuyerCount({
    buyerHandle,
    minimalAmountOfServices = 1,
  }: DidSellerServiceBuyer): Promise<number> {
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

  public async didWorkOnTopic({
    topic,
    numberOfTimes = 1,
  }: DidWorkOnTopic): Promise<FetchedData> {
    return this.processDidWorkOnTopic(topic, numberOfTimes);
  }

  public async didWorkOnTopicCount({
    topic,
    numberOfTimes = 1,
  }: DidWorkOnTopic): Promise<number> {
    return Object.keys(await this.processDidWorkOnTopic(topic, numberOfTimes))
      .length;
  }

  /**
   * Get Talent that earned a minium salary
   */
  private async processDidUserMinimalEarnedOfToken(
    minimumEarnings: number,
    tokenSymbol: string
  ): Promise<FetchedData> {
    const minimumEarningsInWei = ethers.utils.parseEther(
      minimumEarnings.toString()
    );

    const dataProfiles: FetchedData = {};
    const response: UserGains = await getUserTotalEarnedQuery(
      this,
      tokenSymbol
    );

    response.userGains.forEach((userGain) => {
      if (BigNumber.from(userGain.totalGain).gte(minimumEarningsInWei)) {
        dataProfiles[userGain.user.address] = 1;
      }
    });

    return dataProfiles;
  }

  public async didUserMinimalEarnedOfToken({
    minimumEarnings = 1,
    tokenSymbol = "MATIC",
  }: DidUserMinimalEarnedOfToken): Promise<FetchedData> {
    return this.processDidUserMinimalEarnedOfToken(
      minimumEarnings,
      tokenSymbol
    );
  }

  public async didUserMinimalEarnedOfTokenCount({
    minimumEarnings = 1,
    tokenSymbol = "MATIC",
  }: DidUserMinimalEarnedOfToken): Promise<number> {
    return Object.keys(
      await this.processDidUserMinimalEarnedOfToken(
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

  public async didWorkWithRating({
    minRating,
    numberOfTimes = 1,
  }: DidWorkWithRating): Promise<FetchedData> {
    return this.processDidWorkWithRating(minRating, numberOfTimes);
  }

  public async didWorkWithRatingCount({
    minRating,
    numberOfTimes = 1,
  }: DidWorkWithRating): Promise<number> {
    return Object.keys(
      await this.processDidWorkWithRating(minRating, numberOfTimes)
    ).length;
  }

  /**
   * Get Talent of the month for a specific topic'
   * @param topic
   * @param period
   * @param leaderboardSize
   */
  public async processGetTalentOfTheMonth(
    topic: string,
    period: string,
    tokenSymbol: string,
    leaderboardSize: number
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const yearStart = period.split("-")[0];
    const monthStart = period.split("-")[1];
    const yearEnd = Number(monthStart == "12")
      ? String(Number(yearStart) + 1)
      : yearStart;
    const monthEnd = Number(monthStart == "12")
      ? "01"
      : String(Number(monthStart) + 1).padStart(2, "0");

    const timestampStart =
      new Date(`${yearStart}-${monthStart}-01T00:00:00`).getTime() / 1000;
    const timestampEnd =
      new Date(`${yearEnd}-${monthEnd}-01T00:00:00`).getTime() / 1000;

    const users: AddressPayments = {};

    const response: Services = await getServicesInTimeframeQuery(
      this,
      timestampStart,
      timestampEnd,
      topic
    );

    response.services.forEach((service) => {
      if (
        service.transaction &&
        service.transaction.token.symbol == tokenSymbol
      ) {
        service.transaction?.payments.forEach((payment) => {
          const amount = ethers.utils.formatEther(payment.amount);
          if (service.seller.address in users) {
            users[service.seller.address] =
              users[service.seller.address] + Number(amount);
          } else {
            users[service.seller.address] = Number(amount);
          }
        });
      }
    });

    const sortedUsers = Object.keys(users).sort((a, b) => users[b] - users[a]);

    sortedUsers.slice(0, leaderboardSize).forEach((address) => {
      dataProfiles[address] = 1;
    });

    return dataProfiles;
  }

  public async getTalentOfTheMonth({
    topic,
    period = "2023-03",
    tokenSymbol = "MATIC",
    leaderboardSize = 1,
  }: TalentOfTheMonth): Promise<FetchedData> {
    return this.processGetTalentOfTheMonth(
      topic,
      period,
      tokenSymbol,
      leaderboardSize
    );
  }

  public async getTalentOfTheMonthCount({
    topic,
    period = "2023-03",
    tokenSymbol = "MATIC",
    leaderboardSize = 1,
  }: TalentOfTheMonth): Promise<number> {
    return Object.keys(
      await this.processGetTalentOfTheMonth(
        topic,
        period,
        tokenSymbol,
        leaderboardSize
      )
    ).length;
  }
}
