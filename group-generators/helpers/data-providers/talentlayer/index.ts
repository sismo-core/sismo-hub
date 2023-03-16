import {
  getUsersWithTalentLayerIdQuery,
  getTalentLayerUserCountQuery,
} from "./queries";
import { Users } from "./types";
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
    const users: Users = await getUsersWithTalentLayerIdQuery(this);
    users.data.users.forEach((user) => {
      dataProfiles[user.address] = 1;
    });
    return dataProfiles;
  }

  public async getTalentLayerUserCount(): Promise<number> {
    const users = await getTalentLayerUserCountQuery(this);
    return users.data.users.length;
  }
}
