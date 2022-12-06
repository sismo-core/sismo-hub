import { gql } from "graphql-request";
import {
  ISnapshotProvider,
  QueryAllVotersInput,
  QueryProposalVotersInput,
  QuerySpaceVotersInput,
  QueryVotersOutput,
} from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
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
    let fetchedData: FetchedData = {};

    if ("space" in input) {
      fetchedData = await this.querySpaceVoters(input);
    } else if ("proposal" in input) {
      fetchedData = await this.queryProposalVoters(input);
    }
    return fetchedData;
  }

  public async querySpaceVoters(
    input: QuerySpaceVotersInput,
    defaultValue = 1
  ): Promise<FetchedData> {
    const chunkSize = 20000;
    let currentChunkIndex = 0;
    let currentChunkVoters: { voter: string }[] = [];
    const fetchedData: { [address: string]: number } = {};

    do {
      currentChunkVoters = (
        await this._querySpaceVoters(input, currentChunkIndex, chunkSize)
      ).votes;

      for (const currentChunkVoter of currentChunkVoters) {
        fetchedData[currentChunkVoter.voter] = defaultValue;
      }

      currentChunkIndex++;
    } while (currentChunkVoters.length > 0);

    return fetchedData;
  }

  public async queryProposalVoters(
    input: QueryProposalVotersInput,
    defaultValue = 1
  ): Promise<FetchedData> {
    const chunkSize = 20000;
    let currentChunkIndex = 0;
    let currentChunkVoters: { voter: string }[] = [];
    const fetchedData: { [address: string]: number } = {};

    do {
      currentChunkVoters = (
        await this._queryProposalVoters(input, currentChunkIndex, chunkSize)
      ).votes;

      for (const currentChunkVoter of currentChunkVoters) {
        fetchedData[currentChunkVoter.voter] = defaultValue;
      }

      currentChunkIndex++;
    } while (currentChunkVoters.length > 0);

    return fetchedData;
  }

  /**
   * Use this method to query all voters of a space on Snapshot in a chuncked way.
   * @param param0 The input of this method to create the GraphQL Query.
   * @param startingIndex The iteration index of the current chunk
   * @param chunkSize The size of the current chunk
   * @returns The current chuncked voters of the requested space
   */
  private async _querySpaceVoters(
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
  private _queryProposalVoters(
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
