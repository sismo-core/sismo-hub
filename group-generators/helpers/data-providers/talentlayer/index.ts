import {
  getUsersWithTalentLayerIdQuery,
  getTalentLayerUsersCountQuery,
  didSellerWorkForBuyerQuery,
} from "./queries";
import { Service, Users } from "./types";
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
    seller: string
  ): Promise<FetchedData> {
    const service: FetchedData = {};
    const response: Service = await didSellerWorkForBuyerQuery(
      this,
      buyer,
      seller
    );
    service[response.seller.address] = 1;
    return service;
  }
}
