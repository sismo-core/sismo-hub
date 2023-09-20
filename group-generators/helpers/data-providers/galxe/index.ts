import { ethers } from "ethers";
import { gql } from "graphql-request";
import { QueryCampaignOutput, QueryCampaignInput, IGalxeProvider } from "./types";

import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class GalxeProvider extends GraphQLProvider implements IGalxeProvider {
  constructor() {
    super({ url: "https://graphigo.prd.galaxy.eco/query" });
  }

  public async getCampaignHolders({ id }: QueryCampaignInput): Promise<FetchedData> {
    const holders: FetchedData = {};
    let response: QueryCampaignOutput;
    let cursor = 0;

    // Get last block number - 1000 to avoid errors (API can be late)
    const lastBlockNumber = (await ethers.getDefaultProvider().getBlockNumber()) - 10000;

    do {
      try {
        const query = gql`
          query Campaign($id: ID!, $block: Int!, $cursor: String!) {
            campaign(id: $id) {
              id
              status
              numNFTMinted
              nftHolderSnapshot {
                holders(block: $block, first: 1000, after: $cursor) {
                  list {
                    holder
                    id
                  }
                }
              }
            }
          }
        `;

        response = await this.query<QueryCampaignOutput>(query, {
          id,
          block: lastBlockNumber,
          cursor: cursor.toString(),
        });

        if (response.campaign.nftHolderSnapshot.holders.list.length) {
          for (const holderProfile of response.campaign.nftHolderSnapshot.holders.list) {
            holders[holderProfile.holder] = holderProfile.id;
          }

          cursor += response.campaign.nftHolderSnapshot.holders.list.length;
        }
      } catch (error) {
        throw new Error("Error fetching campaign holders");
      }
    } while (response.campaign.nftHolderSnapshot.holders.list.length > 0);
    return holders;
  }

  public async getCampaignHoldersCount({ id }: QueryCampaignInput): Promise<number> {
    const holders = await this.getCampaignHolders({ id });
    return Object.keys(holders).length;
  }
}
