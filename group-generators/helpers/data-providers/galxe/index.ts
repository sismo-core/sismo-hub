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
    let response: QueryCampaignOutput;
    let cursor = 0;

    do{
      try {
        const query = gql`
          query Campaign($id: ID!, $cursor: String!) {
            campaign(id: $id) {
              id
              status
              numNFTMinted
              holdersList(first: 1000, after: $cursor)
            }
        }
        `;
        
        response = await this.query<QueryCampaignOutput>(query, {
          id,
          cursor: cursor.toString(),
        });

        if(response.campaign.holdersList){
          for (const holder of response.campaign.holdersList) {
            holders[holder] = 1;
          }
  
          cursor += response.campaign.holdersList.length;
        }

      } catch (error) {
        throw new Error("Error fetching campaign holders");
      }
    } while (response.campaign.holdersList);
    return holders;
  }

  public async getCampaignHoldersCount({
    id,
  }: QueryCampaignInput): Promise<number> {
    const holders = await this.getCampaignHolders({ id });
    return Object.keys(holders).length;
  }
}
