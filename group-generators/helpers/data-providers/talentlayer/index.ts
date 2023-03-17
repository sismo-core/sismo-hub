import {
  getUsersWithTalentLayerIdQuery,
  getTalentLayerUsersCountQuery,
  didSellerServiceBuyerQuery,
  getUserTotalSalaryQuery,
} from "./queries";
import { ServicesType, UsersType } from "./types";
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
    const response: UsersType = await getUsersWithTalentLayerIdQuery(this);
    response.users.forEach((user) => {
      dataProfiles[user.address] = 1;
    });
    return dataProfiles;
  }

  public async getTalentLayerUsersCount(): Promise<number> {
    const response = await getTalentLayerUsersCountQuery(this);
    return response.users.length;
  }

  public async didSellerServiceBuyer(buyer: string): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    const response: ServicesType = await didSellerServiceBuyerQuery(
      this,
      buyer
    );
    response.services.forEach((service) => {
      if (dataProfiles[service.seller.address]) {
        dataProfiles[service.seller.address] =
          Number(dataProfiles[service.seller.address]) + 1;
      } else {
        dataProfiles[service.seller.address] = 1;
      }
    });
    return dataProfiles;
  }

  public async getUserTotalSalary(userAddress: string): Promise<FetchedData> {
    const userGains: FetchedData = {};
    const response: UsersType = await getUserTotalSalaryQuery(
      this,
      userAddress
    );
    response.users.forEach((user) => {
      userGains[user.address] = user.gains?.totalGain || 0;
    });
    return userGains;
  }
}
