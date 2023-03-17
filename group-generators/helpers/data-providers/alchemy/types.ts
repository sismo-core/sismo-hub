import { FetchedData } from "topics/group";

export type QueryEventsTokensOwnersOuput = {
  events: { tokens: { owner: { id: string | number }[] } };
};

export type QueryCollectionOwnersOutput = {
  event: { tokens: { owner: { id: string | number } }[] };
};

export type QueryCollectionOwnersInput = { contractAddress: string };

export interface IAlchemyProvider {
  queryCollectionOwners(
    input: QueryCollectionOwnersInput
  ): Promise<FetchedData>;
}
