import { gql } from "graphql-request";
// eslint-disable-next-line no-restricted-imports
import { SubgraphHostedServiceProvider } from "../subgraph";
import {
  IOtterspaceSubgraphProvider,
  QueryBadgeHoldersInput,
  QueryBadgeHoldersOutput,
  fromStringToSupportedNetworkLink,
} from "./types";
import { FetchedData } from "topics/group";

export class OtterSpaceSubgraphProvider
  extends SubgraphHostedServiceProvider
  implements IOtterspaceSubgraphProvider
{
  constructor(network?: string) {
    super({
      url: network
        ? fromStringToSupportedNetworkLink(network)
        : "https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism",
    });
  }

  public async getBadgeHolders({ id }: QueryBadgeHoldersInput): Promise<FetchedData> {
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
              owner {
                id
              }
              createdAt
            }
          }
        }
      `;
      const res: QueryBadgeHoldersOutput = await this.query<QueryBadgeHoldersOutput>(query);

      res.badgeSpec.badges.forEach((badge) => {
        holders[badge.owner.id] = badge.createdAt;
      });
    } catch (error) {
      console.log(error);
    }
    return holders;
  }

  public async getBadgeHoldersCount({ id }: QueryBadgeHoldersInput): Promise<number> {
    const holders = await this.getBadgeHolders({ id });
    return Object.keys(holders).length;
  }
}
