import { gql } from "graphql-request";
// eslint-disable-next-line no-restricted-imports
import { SubgraphHostedServiceProvider } from "../subgraph";
import {
  QueryMirrorXyzOutput,
  QueryMirrorXyzInput,
  IMirrorXyzSubgraphProvider,
} from "./types";

import { FetchedData } from "topics/group";

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
    const query = gql`
      query {
        writingEditionPurchaseds(
          where: {
            clone_: { id: "${contract}" }
          }
        ) {
          tokenId
          recipient
        }
      }
    `;

    const res: QueryMirrorXyzOutput = await this.query<QueryMirrorXyzOutput>(
      query
    );
    const collectors: FetchedData = {};

    if (res.writingEditionPurchaseds.length > 0) {
      res.writingEditionPurchaseds.forEach((post) => {
        collectors[post.recipient] = 1;
      });
      return collectors;
    } else {
      throw new Error("No post found");
    }
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
