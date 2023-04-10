import { gql } from "graphql-request";
import {
  QueryCampaignOutput,
  QueryCampaignInput,
  IGalxeProvider,
} from "./types";

import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class GalxeProvider extends GraphQLProvider implements IGalxeProvider {
  constructor() {
    super({ url: "https://graphigo.prd.galaxy.eco/query" });
  }

  public async getCampaignHolders({
    id,
  }: QueryCampaignInput): Promise<FetchedData> {
    const holders: FetchedData = {};
    let after = "0";
    let campaign: QueryCampaignOutput["campaign"];

    do {
      const query = gql`
        query Campaign {
        campaign(id: "${id}") {
          id
          name
          status
          numNFTMinted
          holdersList(first: 1000, after: "${after}")
        }
      }
    `;

      const response: QueryCampaignOutput =
        await this.query<QueryCampaignOutput>(query);

      campaign = response.campaign;
      for (const holder of campaign.holdersList) {
        holders[holder] = 1;
      }

      after = campaign.holdersList.slice(-1)[0];
    } while (Object.keys(holders).length < campaign.numNFTMinted);

    return holders;
  }

  public async getCampaignHoldersCount({
    id,
  }: QueryCampaignInput): Promise<number> {
    const holders = await this.getCampaignHolders({ id });
    return Object.keys(holders).length;
  }
}
