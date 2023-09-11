import { IGraphQLProvider } from "@group-generators/helpers/data-providers/graphql/types";

export type ITallyProvider = IGraphQLProvider;

export interface inputGetGovernanceProposers {
  name: string;
}

export interface inputGetProposalVoters {
  name: string;
  proposalId: number;
}

export interface queryToNameArray {
  id: string;
  name: string;
}

export interface inputQueryToName {
  governors?: queryToNameArray[];
}

export interface Delegate {
  id: string;
  account: { address: string };
  stats: {
    voteCount: number;
  };
}

export interface govArray {
  id: string;
  type: string;
  name: string;
  proposals: any[];
  delegates: Delegate[];
}

export interface queryData {
  governors?: govArray[];
}
