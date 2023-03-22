import { gql } from "graphql-request";
import {
  QueryBadgeHoldersInput,
  IOtterspaceSubgraphProvider,
  QueryBadgeHoldersOutput,
} from "./types";
import { SubgraphHostedServiceProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export default class OtterspaceSubgraphBaseProvider
  extends SubgraphHostedServiceProvider
  implements IOtterspaceSubgraphProvider
{
  constructor(url?: string) {
    super({
      url:
        url ??
        "https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism",
    });
  }

  /**
   * Use this method to query all holders of specific Otterspace badge
   * @param param0 The badgeId to query holders of
   * @returns The group of all adresses having that badge
   */
  public async getBadgeHolders({
    id,
  }: QueryBadgeHoldersInput): Promise<FetchedData> {
    const holders: FetchedData = {};

    try {
      const query = gql`
        query badges {
          badgeSpec(
            id: "${id}"
          ) {
            id
            badges {
              id
              owner
            }
          }
        }
      `;
      const res: QueryBadgeHoldersOutput =
        await this.query<QueryBadgeHoldersOutput>(query);

      res.badgeSpec.badges.forEach((badge) => {
        holders[badge.owner] = 1;
      });
    } catch (error) {
      console.log(error);
    }
    return holders;
  }
}
