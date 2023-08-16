import { IGraphQLProvider } from "@group-generators/helpers/data-providers/graphql/types";
import { FetchedData } from "topics/group";

export type QueryCampaignOutput = {
  campaign: {
    id: string;
    status: string;
    numNFTMinted: number;
    nftHolderSnapshot: NftHolderSnapshot;
  };
};

export type NftHolderSnapshot = {
  holders: {
    list: {
      holder: string;
      id: string;
    }[];
  };
};

export type QueryCampaignInput = {
  id: string;
};

export interface IGalxeProvider extends IGraphQLProvider {
  getCampaignHolders(input: QueryCampaignInput): Promise<FetchedData>;
}
