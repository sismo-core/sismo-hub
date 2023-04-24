import { gql } from "graphql-request";
import { QueryMembersOutput, QueryMembersInput, IRep3Provider } from "./types";

import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class Rep3Provider extends GraphQLProvider implements IRep3Provider {
  constructor() {
    super({
      url: "https://thegraph.com/hosted-service/subgraph/eth-jashan/rep3-matic",
    });
  }

  public async getMembershipHolders({
    contract,
    level = "empty",
  }: QueryMembersInput): Promise<FetchedData> {
    const holders: FetchedData = {};
    let levelSetting = "";

    if (level === "empty") {
      levelSetting = `"level_gte": "1"`;
    } else {
      levelSetting = `"level": "${level}"`;
    }

    try {
      const query = gql`{
          membershipNFTs(
            where: { contractAddress: "${contract}", ${levelSetting} }
            first: 1000
          ) {
            claimer
            level
            tokenID
          }
        }
      `;

      const response: QueryMembersOutput = await this.query<QueryMembersOutput>(
        query
      );

      for (const holder of response.membershipNFTs) {
        holders[holder.claimer] = 1;
      }
    } catch (error) {
      throw new Error("Error fetching membership holders");
    }
    return holders;
  }

  public async getMembershipHoldersCount({
    contract,
    level,
  }: QueryMembersInput): Promise<number> {
    const holders = await this.getMembershipHolders({ contract, level });
    return Object.keys(holders).length;
  }
}
