import { FetchedData } from "../../../../../src/group";
import {
  PoapChainTarget,
  QueryEventsTokensOwnersInput,
  QueryEventTokenOwnersInput,
} from "../types";

export interface IPoapCrossChainSubgraphProvider {
  queryEventTokenOwners(
    input: QueryEventTokenOwnersInput
  ): Promise<FetchedData>;

  queryEventsTokenOwners(
    input: QueryEventsTokensOwnersInput
  ): Promise<FetchedData>;
}

export type PoapCrossChainSubgraphProviderConstructor = {
  targettedChains: PoapChainTarget[];
};
