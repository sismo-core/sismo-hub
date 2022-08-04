import readline from "readline";
import { gql } from "graphql-request";
import {
  ISnapshotProvider,
  QueryAllVotersInput,
  QueryProposalVotersInput,
  QuerySpaceVotersInput,
  QueryVotersOutput,
} from "./types";
import { GraphQLProvider } from "@group-generators/helpers/providers/graphql";
import { FetchedData } from "topics/group";

export default class SnapshotProvider
  extends GraphQLProvider
  implements ISnapshotProvider
{
  constructor() {
    super({ url: "https://hub.snapshot.org/graphql" });
  }

  /**
   * Use this method to query all voters of a space or a proposal on Snapshot.
   * @param input Can be either a SnapshotQuerySpaceVotersInput or a SnapshotQueryProposalVotersInput
   * @returns The addresses of all voters of the requested space or proposal
   */
  public async queryAllVoters(
    input: QueryAllVotersInput
  ): Promise<FetchedData> {
    const chunkSize = 20000;
    const fetchedData: { [address: string]: number } = {};
    let currentChunkIndex = 0;
    let currentChunkVoters: { voter: string }[] = [];

    do {
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(
        `downloading ... (${chunkSize * currentChunkIndex})`
      );

      if ("space" in input) {
        currentChunkVoters = (
          await this.querySpaceVoters(input, currentChunkIndex, chunkSize)
        ).votes;
      } else if ("proposal" in input) {
        currentChunkVoters = (
          await this.queryProposalVoters(input, currentChunkIndex, chunkSize)
        ).votes;
      }

      for (const currentChunkVoter of currentChunkVoters) {
        fetchedData[currentChunkVoter.voter] =
          (fetchedData[currentChunkVoter.voter] ?? 0) + 1;
      }

      currentChunkIndex++;
    } while (currentChunkVoters.length > 0);

    readline.cursorTo(process.stdout, 0);

    return fetchedData;
  }

  /**
   * Use this method to query all voters of a space on Snapshot in a chuncked way.
   * @param param0 The input of this method to create the GraphQL Query.
   * @param startingIndex The iteration index of the current chunk
   * @param chunkSize The size of the current chunk
   * @returns The current chuncked voters of the requested space
   */
  private async querySpaceVoters(
    { space }: QuerySpaceVotersInput,
    startingIndex = 0,
    chunkSize: number
  ): Promise<QueryVotersOutput> {
    return this.query<QueryVotersOutput>(
      gql`
        query GetAllSpaceVoters(
          $space: String!
          $chunkSize: Int!
          $skip: Int!
        ) {
          votes(
            first: $chunkSize
            skip: $skip
            where: { space: $space }
            orderBy: "created"
            orderDirection: desc
          ) {
            voter
          }
        }
      `,
      {
        space,
        chunkSize,
        skip: startingIndex * chunkSize,
      }
    );
  }

  /**
   * Use this method to query all voters of a space on Snapshot in a chuncked way.
   * @param param0 The input of this method to create the GraphQL Query.
   * @param startingIndex The iteration index of the current chunk
   * @param chunkSize The size of the current chunk
   * @returns The current chuncked voters of the requested proposal
   */
  private queryProposalVoters(
    { proposal }: QueryProposalVotersInput,
    startingIndex = 0,
    chunkSize: number
  ): Promise<QueryVotersOutput> {
    return this.query<QueryVotersOutput>(
      gql`
        query GetAllProposalVoters(
          $proposal: String!
          $chunkSize: Int!
          $skip: Int!
        ) {
          votes(
            first: $chunkSize
            skip: $skip
            where: { proposal: $proposal }
            orderBy: "created"
            orderDirection: desc
          ) {
            voter
          }
        }
      `,
      {
        proposal,
        chunkSize,
        skip: startingIndex * chunkSize,
      }
    );
  }
}
