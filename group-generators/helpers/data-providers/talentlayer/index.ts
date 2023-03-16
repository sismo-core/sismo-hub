import {
  getUsersWithTalentLayerIdQuery,
  getTalentLayerUsersCountQuery,
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
    users.data.data.users.forEach((user) => {
      dataProfiles[user.address] = 1;
    });
    return dataProfiles;
  }

  public async getTalentLayerUsersCount(): Promise<number> {
    const users = await getTalentLayerUsersCountQuery(this);
    return users.data.data.users.length;
  }
}
