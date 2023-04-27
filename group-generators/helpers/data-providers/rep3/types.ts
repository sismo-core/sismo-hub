import { IGraphQLProvider } from "@group-generators/helpers/data-providers/graphql/types";
import { FetchedData } from "topics/group";

export type QueryMembersOutput = {
  membershipNFTs: [
    {
      claimer: string;
      level: string;
      tokenID: string;
    }
  ];
};

export type QueryMembersInput = {
  contract: string;
  level: string;
};

export interface IRep3Provider extends IGraphQLProvider {
  getMembershipHolders(input: QueryMembersInput): Promise<FetchedData>;
}
