// eslint-disable-next-line no-restricted-imports
import { gql } from "graphql-request";
// eslint-disable-next-line no-restricted-imports
import { SubgraphHostedServiceProvider } from "../subgraph";
import { BadgeId, SubgraphRespnse } from "./types";
import { FetchedData } from "topics/group";

export class OtterspaceProvider {
  url: string;

  public constructor() {
    this.url =
      "https://api.thegraph.com/subgraphs/name/otterspace-xyz/badges-optimism";
  }

  public async getBadgeHolders({ id }: BadgeId): Promise<FetchedData> {
    const holders: FetchedData = {};

    try {
      const subqraphProvider = new SubgraphHostedServiceProvider({
        url: this.url,
      });

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
      const res: SubgraphRespnse = await subqraphProvider.query(query);

      console.log(res.badgeSpec);

      res.badgeSpec.badges.forEach((badge) => {
        holders[badge.owner] = 1;
      });
    } catch (error) {
      console.log(error);
    }
    return holders;
  }

  public async getBadgeHoldersCount({ id }: BadgeId) {
    const holders = await this.getBadgeHolders({ id });
    return Object.keys(holders).length;
  }
}
