import { ISubgraphProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export type QueryMirrorXyzOutput = {
  writingEditionPurchaseds: [
    {
      tokenId: string;
      recipient: string;
    }
  ];
};

export type QueryMirrorXyzInput = { contract: string };

export interface IMirrorXyzSubgraphProvider extends ISubgraphProvider {
  getPostCollectors(input: QueryMirrorXyzInput): Promise<FetchedData>;
}
