import readline from "readline";
import { gql } from "graphql-request";
import {
  ISismoSubgraphProvider,
  QueryBadgeHoldersOutput,
  QueryBadgesOptions,
  QueryCollectionIdsOutput,
} from "./types";
import { SubgraphHostedServiceProvider } from "@group-generators/data-providers/subgraph";
import { FetchedData } from "topics/group";

export default class SismoSubgraphBaseProvider
  extends SubgraphHostedServiceProvider
  implements ISismoSubgraphProvider
{
  constructor(url?: string) {
    super({
      url:
        url ?? "https://subgraphs-sismo-polygon.sismo.io/subgraphs/name/sismo-core/sismo-polygon",
    });
  }

  public async queryBadgesHolders(
    { tokenIds, removedIds, defaultValue }: QueryBadgesOptions = {
      tokenIds: [],
      removedIds: [],
    }
  ): Promise<FetchedData> {
    if (tokenIds === undefined) {
      tokenIds = await this.queryCollectionIds();
    }
    if (removedIds === undefined) {
      removedIds = [];
    }
    const fetchedData: { [address: string]: number } = {};

    let downloadNumber = 0;

    for (const tokenId of tokenIds) {
      if (removedIds.indexOf(tokenId) === -1) {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`downloading ... (${downloadNumber})`);

        const badgeDatas = (await this.queryBadgeHolders(tokenId)) as {
          [address: string]: number;
        };

        downloadNumber += Object.keys(badgeDatas).length;

        for (const badgeData of Object.keys(badgeDatas)) {
          fetchedData[badgeData] = defaultValue ?? 1;
        }
      }
    }

    return fetchedData;
  }

  public async queryBadgeHolders(tokenId: number): Promise<FetchedData> {
    const chunkSize = 10000;
    let currentChunkIndex = 0;
    const fetchedData: { [address: string]: number } = {};
    let currentChunkBadgeHolders: QueryBadgeHoldersOutput;

    do {
      currentChunkBadgeHolders = await this.query<QueryBadgeHoldersOutput>(
        gql`
          query GetBadgeHolders($tokenId: Int!, $badgesChunkSize: Int!, $badgesSkip: Int!) {
            mintedBadges(where: { tokenId: $tokenId }, first: $badgesChunkSize, skip: $badgesSkip) {
              owner {
                id
              }
            }
          }
        `,
        {
          tokenId: tokenId,
          badgesChunkSize: chunkSize,
          badgesSkip: chunkSize * currentChunkIndex,
        }
      );

      for (const currentChunkBadge of currentChunkBadgeHolders.mintedBadges || []) {
        fetchedData[currentChunkBadge.owner.id] = 1;
      }
      currentChunkIndex++;
    } while (currentChunkBadgeHolders.mintedBadges?.length);

    readline.cursorTo(process.stdout, 0);

    return fetchedData;
  }

  public async queryCollectionIds(): Promise<number[]> {
    const chunkSize = 10000;
    let currentChunkIndex = 0;
    const collectionIds: number[] = [];
    let currentChunkCollectionIds: QueryCollectionIdsOutput;

    do {
      currentChunkCollectionIds = await this.query<QueryCollectionIdsOutput>(
        gql`
          query GetCollectionIds($collectionIdsChunkSize: Int!, $collectionIdsSkip: Int!) {
            collections(first: $badgesChunkSize, skip: $collectionIdsSkip) {
              id
            }
          }
        `,
        {
          collectionIdsChunkSize: chunkSize,
          collectionIdsSkip: chunkSize * currentChunkIndex,
        }
      );

      for (const collectionId of currentChunkCollectionIds.collections || []) {
        collectionIds.push(parseInt(collectionId.id));
      }
      currentChunkIndex++;
    } while (currentChunkCollectionIds.collections?.length);

    return collectionIds;
  }
}
