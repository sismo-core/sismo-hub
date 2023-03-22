import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryBadgeHoldersOutput = {
  badgeSpec: {
    id: string;
    badges: [
      {
        id: string;
        owner: string;
      }
    ];
  };
};

export type QueryBadgeHoldersInput = { id: string };

export interface IOtterspaceSubgraphProvider extends ISubgraphProvider {
  getBadgeHolders(input: QueryBadgeHoldersInput): Promise<FetchedData>;
}
