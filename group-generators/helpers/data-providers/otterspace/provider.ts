import { gql } from "graphql-request";
import OtterspaceSubgraphBaseProvider from "./base-provider";
import { QueryBadgeHoldersInput, QueryBadgeHoldersOutput } from "./types";
import { FetchedData } from "topics/group";

export class OtterSpaceSubgraphProvider {
  otterspaceSubgraphProvider: OtterspaceSubgraphBaseProvider;

  constructor(url?: string) {
    this.otterspaceSubgraphProvider = new OtterspaceSubgraphBaseProvider(url);
  }

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
        await this.otterspaceSubgraphProvider.query<QueryBadgeHoldersOutput>(
          query
        );

      res.badgeSpec.badges.forEach((badge) => {
        holders[badge.owner] = 1;
      });
    } catch (error) {
      console.log(error);
    }
    return holders;
  }

  public async getBadgeHoldersCount({
    id,
  }: QueryBadgeHoldersInput): Promise<number> {
    const holders = await this.getBadgeHolders({ id });
    return Object.keys(holders).length;
  }
}
