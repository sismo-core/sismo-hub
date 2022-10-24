import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryBadgeHoldersOutput = {
  badges: { number: string; owner: { id: string | number } }[];
};

export type QueryCollectionIdsOutput = {
  collections: { id: string }[];
};

export interface ISismoSubgraphProvider extends ISubgraphProvider {
  queryBadgesHolders(tokenIds: number[]): Promise<FetchedData>;
  queryBadgeHolders(tokenId: number): Promise<FetchedData>;
}
