import {
  getServicesByBuyerAndSellerQuery,
  getServicesByTopicQuery,
  getTalentLayerUsersCountQuery,
  getUsersWithTalentLayerIdQuery,
  getUserTotalSalaryQuery,
} from "./queries";
import { Services, Users } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class TalentLayerProvider extends GraphQLProvider {
  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/talentlayer/talent-layer-mumbai",
    });
  }

  public async getUsersWithTalentLayerId(): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Users = await getUsersWithTalentLayerIdQuery(this);
    response.users.forEach((user) => {
      dataProfiles[user.address] = 1;
    });
    return dataProfiles;
  }

  public async getTalentLayerUsersCount(): Promise<number> {
    const response = await getTalentLayerUsersCountQuery(this);
    return response.users.length;
  }

  public async didSellerWorkForBuyer(
    buyer: string,
    seller: string,
    numberOfTimes: number
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Services = await getServicesByBuyerAndSellerQuery(
      this,
      buyer,
      seller
    );
    if (response.services.length >= numberOfTimes) {
      dataProfiles[response.services[0].seller.address] = 1;
    }
    return dataProfiles;
  }

  public async didWorkOnTopic(
    topic: string,
    numberOfTimes: number
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: Services = await getServicesByTopicQuery(this, topic);
    const countByUser: { [address: string]: number } = {};

    response.services.forEach((service) => {
      countByUser[service.seller.address]++;
    });

    Object.keys(countByUser).forEach((address) => {
      if (countByUser[address] >= numberOfTimes) {
        dataProfiles[address] = 1;
      }
    });
    return dataProfiles;
  }

  public async getUserTotalSalary(userAddress: string): Promise<FetchedData> {
    const userGains: FetchedData = {};
    const response: Users = await getUserTotalSalaryQuery(this, userAddress);
    response.users.forEach((user) => {
      userGains[user.address] = user.gains?.totalGain || 0;
    });
    return userGains;
  }
}
