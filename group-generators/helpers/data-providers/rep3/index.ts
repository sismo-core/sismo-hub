import { gql } from "graphql-request";
import { QueryMembersOutput, QueryMembersInput, IRep3Provider } from "./types";

import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class Rep3Provider extends GraphQLProvider implements IRep3Provider {
  constructor() {
    super({
      url: "https://api.thegraph.com/subgraphs/name/eth-jashan/rep3-matic",
    });
  }

  public async getMembershipHolders({
    contract,
    level,
  }: QueryMembersInput): Promise<FetchedData> {
    const holders: FetchedData = {};

    if (!this.isValidLevel(level)) {
      throw new Error(
        "Invalid level, has to be `all` or a number between 1 and 256"
      );
    }
    const levelSetting =
      level === "all" ? `level_gte: "1"` : `level: "${level}"`;

    try {
      const pageSize = 1000;
      let skip = 0;
      let continuePaging = true;

      while (continuePaging) {
        const response: QueryMembersOutput = await this.fetchPage(
          contract,
          levelSetting,
          pageSize,
          skip
        );

        if (response.membershipNFTs.length > 0) {
          response.membershipNFTs.forEach((holder) => {
            holders[holder.claimer] = 1;
          });
          skip += pageSize;
        } else {
          continuePaging = false;
        }
      }
    } catch (error) {
      throw new Error("Error fetching membership holders");
    }
    return holders;
  }

  public async fetchPage(
    contract: string,
    levelSetting: string,
    pageSize: number,
    skip: number
  ): Promise<QueryMembersOutput> {
    const query = gql`{
      membershipNFTs(
        where: { contractAddress: "${contract}", ${levelSetting} }
        first: ${pageSize}
        skip: ${skip}
      ) {
        claimer
        level
        tokenID
      }
    }`;

    return this.query<QueryMembersOutput>(query, {
      variables: {
        contract,
        levelSetting,
        pageSize,
        skip,
      },
    });
  }

  public async getMembershipHoldersCount({
    contract,
    level,
  }: QueryMembersInput): Promise<number> {
    const holders = await this.getMembershipHolders({ contract, level });
    return Object.keys(holders).length;
  }

  private isValidLevel(level: string): boolean {
    const validLevelPattern =
      /^(all|([0-9]|[1-9][0-9]|1([0-9][0-9])?|2([0-4][0-9]|5[0-6])?))$/;
    return validLevelPattern.test(level);
  }
}
