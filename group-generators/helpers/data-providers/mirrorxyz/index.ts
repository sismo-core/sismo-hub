import { gql } from "graphql-request";
// eslint-disable-next-line no-restricted-imports
import { SubgraphHostedServiceProvider } from "../subgraph";
import {
  QueryMirrorXyzOutput,
  QueryMirrorXyzInput,
  IMirrorXyzSubgraphProvider,
} from "./types";

import { FetchedData } from "topics/group";

//using the optimisim subgraph: https://thegraph.com/hosted-service/subgraph/detoo/mirror-xyz-optimism
export class MirrorXyzSubgraphProvider
  extends SubgraphHostedServiceProvider
  implements IMirrorXyzSubgraphProvider
{
  constructor(url?: string) {
    super({
      url:
        url ??
        "https://api.thegraph.com/subgraphs/name/detoo/mirror-xyz-optimism",
    });
  }

  public async getPostCollectors({
    contract,
  }: QueryMirrorXyzInput): Promise<FetchedData> {
    try {
      const pageSize = 1000;
      let skip = 0;
      let continuePaging = true;
      const collectors: FetchedData = {};

      while (continuePaging) {
        const res: QueryMirrorXyzOutput = await this.fetchPage(
          contract,
          skip,
          pageSize
        );

        if (res.writingEditionPurchaseds.length > 0) {
          res.writingEditionPurchaseds.forEach((post) => {
            collectors[post.recipient] = 1;
          });
          skip += pageSize;
        } else {
          continuePaging = false;
        }
      }

      if (Object.keys(collectors).length > 0) {
        return collectors;
      } else {
        throw new Error("No post found");
      }
    } catch (e) {
      throw new Error("Error fetching post collectors");
    }
  }

  public async fetchPage(
    contract: string,
    skip: number,
    first: number
  ): Promise<QueryMirrorXyzOutput> {
    const query = gql`
      query {
        writingEditionPurchaseds(
          where: {
            clone_: { id: "${contract}" }
          }
          first: ${first}
          skip: ${skip}
        ) {
          tokenId
          recipient
        }
      }
    `;

    return this.query<QueryMirrorXyzOutput>(query, {
      variables: {
        contractId: contract,
        skip,
        first,
      },
    });
  }

  public async getPostCollectorsCount({
    contract,
  }: QueryMirrorXyzInput): Promise<number> {
    const posts = await this.getPostCollectors({
      contract,
    });
    return Object.keys(posts).length;
  }
}
