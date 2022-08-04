import { ISubgraphProvider } from "@group-generators/helpers/providers/subgraph";
import { FetchedData } from "topics/group";

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
}
