import readline from "readline";
import { gql } from "graphql-request";
import {
  IPoapSubgraphProvider,
  QueryEventsTokensOwnersInput,
  QueryEventTokenOwnersInput,
  QueryEventTokensOwnersOutput,
} from "./types";
import { SubgraphHostedServiceProvider } from "@group-generators/helpers/data-providers/subgraph";
import { FetchedData } from "topics/group";

export default class PoapSubgraphBaseProvider
  extends SubgraphHostedServiceProvider
  implements IPoapSubgraphProvider
{
  constructor(url?: string) {
    super({
      url: url ?? "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai",
    });
  }

  /**
   * Use this method to query all poap token owners of many events
   * @param param0 The eventIds of the events to query
   * @returns The group of all the users who have a poap accross all the events
   */
  public async queryEventsTokenOwners({
    eventIds,
    getPower = false,
  }: QueryEventsTokensOwnersInput): Promise<FetchedData> {
    const fetchedData: { [address: string]: number } = {};

    let downloadNumber = 0;
    for (const event of eventIds) {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading ... (${downloadNumber})`);

      const eventDatas = (await this.queryEventTokenOwners({
        eventId: event,
        getPower: getPower,
      })) as { [address: string]: number };

      downloadNumber += Object.keys(eventDatas).length;

      for (const eventData of Object.keys(eventDatas)) {
        fetchedData[eventData] = (fetchedData[eventData] ?? 0) + Number(eventDatas[eventData]);
      }
    }

    return fetchedData;
  }

  /**
   * Use this method to query all poap token owners of a specific event
   * @param param0 The eventId of the event to query
   * @returns The group of all the users who have a poap of the event
   */
  public async queryEventTokenOwners({
    eventId,
    getPower,
  }: QueryEventTokenOwnersInput): Promise<FetchedData> {
    const chunkSize = 1000;
    const fetchedData: { [address: string]: number } = {};
    let currentChunkIndex = 0;
    let currentChunkTokensOwners: QueryEventTokensOwnersOutput;

    do {
      currentChunkTokensOwners = await this.query<QueryEventTokensOwnersOutput>(
        gql`
          query GetEventTokensOwners($eventId: ID!, $tokensChunkSize: Int!, $tokensSkip: Int!) {
            event(id: $eventId) {
              tokens(first: $tokensChunkSize, skip: $tokensSkip) {
                owner {
                  id
                  tokensOwned
                }
              }
            }
          }
        `,
        {
          eventId: eventId,
          tokensChunkSize: chunkSize,
          tokensSkip: chunkSize * currentChunkIndex,
        }
      );

      for (const currentChunkToken of currentChunkTokensOwners.event?.tokens || []) {
        if (currentChunkToken.owner.id != "0x0000000000000000000000000000000000000000") {
          if (getPower) {
            fetchedData[currentChunkToken.owner.id] =
              (fetchedData[currentChunkToken.owner.id] ?? 0) +
              Number(currentChunkToken.owner.tokensOwned);
          } else {
            fetchedData[currentChunkToken.owner.id] =
              (fetchedData[currentChunkToken.owner.id] ?? 0) + 1;
          }
        }
      }

      currentChunkIndex++;
    } while (currentChunkTokensOwners.event?.tokens?.length);

    readline.cursorTo(process.stdout, 0);

    return fetchedData;
  }
}
