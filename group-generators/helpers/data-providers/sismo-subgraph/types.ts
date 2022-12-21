import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryBadgesOptions = { tokenIds?: number[]; removedIds?: number[]; defaultValue?: number };

export type QueryBadgeHoldersOutput = {
  badges: { number: string; owner: { id: string | number } }[];
};

export type QueryCollectionIdsOutput = {
  collections: { id: string }[];
};

export interface ISismoSubgraphProvider extends ISubgraphProvider {
  queryBadgesHolders({
    tokenIds,
    removedIds,
  }: QueryBadgesOptions): Promise<FetchedData>;
  queryBadgeHolders(tokenId: number): Promise<FetchedData>;
}
