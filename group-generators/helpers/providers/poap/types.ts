import { FetchedData } from "../../../../src/group";
import { ISubgraphProvider } from "../subgraph";

export type QueryEventsTokensOwnersOuput = {
  events: { tokens: { owner: { id: string | number }[] } };
};

export type QueryEventTokensOwnersOutput = {
  event: { tokens: { owner: { id: string | number } }[] };
};

export type QueryEventsTokensOwnersInput = { eventIds: (string | number)[] };

export type QueryEventTokenOwnersInput = { eventId: string | number };

export interface IPoapSubgraphProvider extends ISubgraphProvider {
  queryEventTokenOwners(
    input: QueryEventTokenOwnersInput
  ): Promise<FetchedData>;

  queryEventsTokenOwners(
    input: QueryEventsTokensOwnersInput
  ): Promise<FetchedData>;
}

export enum PoapChainTarget {
  XDai = "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai",
  EthereumMainnet = "https://api.thegraph.com/subgraphs/name/poap-xyz/poap",
}

export type PoapSubgraphProviderConstructor = {
  targettedChain: PoapChainTarget;
};
