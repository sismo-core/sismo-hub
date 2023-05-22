import readline from "readline";
import { gql } from "graphql-request";
import {
  ISnapshotProvider,
  QueryAllVotersInput,
  QueryProposalVotersCountOutput,
  QueryProposalVotersInput,
  QuerySpaceVotersCountOutput,
  QuerySpaceVotersInput,
  QueryVotersOutput,
  QuerySpaceFollowersInput,
  QuerySpaceFollowersOutput,
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
    const chunkSize = 1000;
    let created_gt = 0;
    let downloadNumber = 0;
    let currentChunkVoters: { voter: string; created: number }[] = [];
    const fetchedData: { [address: string]: number } = {};

    do {
      currentChunkVoters = (
        await this._querySpaceVoters(input, created_gt, chunkSize)
      ).votes;

      for (const currentChunkVoter of currentChunkVoters) {
        fetchedData[currentChunkVoter.voter] = defaultValue;
        created_gt = currentChunkVoter.created;
      }
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading ... (${downloadNumber})`);
      downloadNumber += currentChunkVoters.length;
    } while (currentChunkVoters.length > 0);

    return fetchedData;
  }

  public async querySpaceVotersCount(
    input: QuerySpaceVotersInput
  ): Promise<number> {
    const spaceVoters = await this._querySpaceVotersCount(input);
    return spaceVoters.space.followersCount;
  }

  public async queryProposalVoters(
    input: QueryProposalVotersInput,
    defaultValue = 1
  ): Promise<FetchedData> {
    const chunkSize = 1000;
    let created_gt = 0;
    let downloadNumber = 0;
    let currentChunkVoters: { voter: string; created: number }[] = [];
    const fetchedData: { [address: string]: number } = {};

    do {
      currentChunkVoters = (
        await this._queryProposalVoters(input, created_gt, chunkSize)
      ).votes;

      for (const currentChunkVoter of currentChunkVoters) {
        fetchedData[currentChunkVoter.voter] = defaultValue;
        created_gt = currentChunkVoter.created;
      }
      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading ... (${downloadNumber})`);
      downloadNumber += currentChunkVoters.length;
    } while (currentChunkVoters.length > 0);

    return fetchedData;
  }

  public async queryProposalVotersCount(
    input: QueryProposalVotersInput
  ): Promise<number> {
    const proposalVoters = await this._queryProposalVotersCount(input);
    return proposalVoters.proposal.votes;
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
    created_gt = 0,
    chunkSize = 1000
  ): Promise<QueryVotersOutput> {
    return this.query<QueryVotersOutput>(
      gql`
        query GetAllSpaceVoters(
          $space: String!
          $created_gt: Int!
          $chunkSize: Int!
        ) {
          votes(
            first: $chunkSize
            where: { space: $space, created_gt: $created_gt }
            orderBy: "created"
            orderDirection: asc
          ) {
            voter
            created
          }
        }
      `,
      {
        chunkSize,
        space,
        created_gt,
      }
    );
  }

  private async _querySpaceVotersCount({
    space,
  }: QuerySpaceVotersInput): Promise<QuerySpaceVotersCountOutput> {
    return this.query<QuerySpaceVotersCountOutput>(
      gql`
        query GetAllSpaceVotersCount($space: String!) {
          space(id: $space) {
            followersCount
          }
        }
      `,
      {
        space,
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
    created_gt = 0,
    chunkSize = 1000
  ): Promise<QueryVotersOutput> {
    return this.query<QueryVotersOutput>(
      gql`
        query GetAllProposalVoters(
          $proposal: String!
          $created_gt: Int!
          $chunkSize: Int!
        ) {
          votes(
            first: $chunkSize
            where: { proposal: $proposal, created_gt: $created_gt }
            orderBy: "created"
            orderDirection: asc
          ) {
            voter
            created
          }
        }
      `,
      {
        proposal,
        chunkSize,
        created_gt,
      }
    );
  }

  private _queryProposalVotersCount({
    proposal,
  }: QueryProposalVotersInput): Promise<QueryProposalVotersCountOutput> {
    return this.query<QueryProposalVotersCountOutput>(
      gql`
        query GetAllProposalVotersCount($proposal: String!) {
          proposal(id: $proposal) {
            votes
          }
        }
      `,
      {
        proposal,
      }
    );
  }

  //Get followers of space
  public async querySpaceFollowers({
    space,
  }: QuerySpaceFollowersInput): Promise<FetchedData> {
    const chunkSize = 1000;
    let created_gt = 0;
    let downloadNumber = 0;
    let currentChunkSpaceFollowers: { follower: string; created: number }[] =
      [];

    const fetchedData: { [address: string]: number } = {};

    do {

      currentChunkSpaceFollowers = (
        await this._querySpaceFollowers(space, created_gt, chunkSize)
      ).follows;

      for (const currentChunkSpaceFollower of currentChunkSpaceFollowers) {
        fetchedData[currentChunkSpaceFollower.follower] = 1;
        created_gt = currentChunkSpaceFollower.created;
      }

      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading ... (${downloadNumber})`);
      downloadNumber += currentChunkSpaceFollowers.length;
    } while (currentChunkSpaceFollowers.length > 0);

    return fetchedData;
  }

  // could be the type here?
  private _querySpaceFollowers(
    space: string,
    created_gt = 0,
    chunkSize = 1000
  ): Promise<QuerySpaceFollowersOutput> {
    return this.query<QuerySpaceFollowersOutput>(
      gql`
        query Follows($space: String!, $created_gt: Int!, $chunkSize: Int!) {
          follows(
            first: $chunkSize
            where: { space: $space, created_gt: $created_gt }
            orderBy: "created"
            orderDirection: asc
          ) {
            follower
            created
          }
        }
      `,
      {
        space,
        chunkSize,
        created_gt,
      }
    );
  }
}
