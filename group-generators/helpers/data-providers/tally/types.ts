import { IGraphQLProvider } from "@group-generators/helpers/data-providers/graphql/types";

export type ITallyProvider = IGraphQLProvider;

export interface inputGetGovernanceProposers {
  governance: string;
}

export interface inputGetProposalVoters {
  governance: string;
  proposalId: number;
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
  proposals: {
    id: string;
    votes: { id: string; voter: { address: string } }[];
    proposer: { address: string };
  }[];
  delegates: Delegate[];
}

export interface queryData {
  governors?: govArray[];
}
