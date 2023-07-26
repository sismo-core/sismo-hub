import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryEventsTokensOwnersOuput = {
  events: { tokens: { owner: { id: string | number }[] } };
};

export type QueryEventTokensOwnersOutput = {
  event: {
    tokens: {
      owner: {
        id: string | number;
        tokensOwned: number;
      };
    }[];
  };
};

export type QueryEventsTokensOwnersInput = {
  eventIds: (string | number)[];
  getPower?: boolean;
};

export type QueryEventTokenOwnersInput = {
  eventId: string | number;
  getPower: boolean;
};

export interface IPoapSubgraphProvider extends ISubgraphProvider {
  queryEventTokenOwners(input: QueryEventTokenOwnersInput): Promise<FetchedData>;
}
