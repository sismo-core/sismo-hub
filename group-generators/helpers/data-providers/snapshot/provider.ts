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
  QuerySpaceAuthorsInput,
  QuerySpaceAuthorsOutput,
  QuerySpaceAdminsInput,
  QuerySpaceAdminsOutput,
  QuerySpaceVotersAboveXInput,
  QueryProposalAuthorsAboveXInput,
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
    input: QuerySpaceVotersInput
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
        if (!fetchedData[currentChunkVoter.voter]) {
          fetchedData[currentChunkVoter.voter] = 1;
        } else {
          fetchedData[currentChunkVoter.voter] += 1;
        }
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

  /**
   * Retrieves space followers from Snapshot.
   * @param {Object} input - Input parameters.
   * @param {string} input.space - The space to query followers for.
   * @param {string} [input.date] - Optional date string to filter followers created after the specified date.
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object containing fetched data with follower addresses as keys and values set to 1.
   */
  public async querySpaceFollowers({
    space,
    date,
  }: QuerySpaceFollowersInput): Promise<FetchedData> {
    const chunkSize = 1000;
    let downloadNumber = 0;
    let currentChunkSpaceFollowers: { follower: string; created: number }[] =
      [];
    const fetchedData: { [address: string]: number } = {};
    let created_gt = 0;
    if (date) {
      created_gt = Date.parse(date) / 1000;
    }

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

  public async querySpaceFollowersCount({
    space,
    date,
  }: QuerySpaceFollowersInput): Promise<number> {
    const followers = await this.querySpaceFollowers({
      space,
      date,
    });
    return Object.keys(followers).length;
  }

  /**
   * Retrieves space authors from Snapshot.
   * @param {string} string - space query parameter
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object with number of proposals the user authored
   */
  public async querySpaceAuthors({
    space,
  }: QuerySpaceAuthorsInput): Promise<FetchedData> {
    const chunkSize = 1000;
    let created_gt = 0;
    let downloadNumber = 0;
    let currentChunkAuthors: { author: string; created: number }[] = [];
    const fetchedData: { [address: string]: number } = {};

    do {
      currentChunkAuthors = (
        await this._querySpaceAuthors(space, created_gt, chunkSize)
      ).proposals;

      for (const currentChunkAuthor of currentChunkAuthors) {
        if (!fetchedData[currentChunkAuthor.author]) {
          fetchedData[currentChunkAuthor.author] = 1;
        } else {
          fetchedData[currentChunkAuthor.author] += 1;
        }
        created_gt = currentChunkAuthor.created;
      }

      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading ... (${downloadNumber})`);
      downloadNumber += currentChunkAuthors.length;
    } while (currentChunkAuthors.length > 0);

    return fetchedData;
  }

  private _querySpaceAuthors(
    space: string,
    created_gt = 0,
    chunkSize = 1000
  ): Promise<QuerySpaceAuthorsOutput> {
    return this.query<QuerySpaceAuthorsOutput>(
      gql`
        query Authors($space: String!, $created_gt: Int!, $chunkSize: Int!) {
          proposals(
            first: $chunkSize
            where: { space: $space, created_gt: $created_gt }
            orderBy: "created"
            orderDirection: asc
          ) {
            author
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

  public async querySpaceAuthorsCount({
    space,
  }: QuerySpaceAuthorsInput): Promise<number> {
    const authors = await this.querySpaceAuthors({ space });
    return Object.keys(authors).length;
  }

  /**
   * Retrieves space admins from Snapshot.
   * @param {string} string - space query parameter
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object containing space admins.
   */
  public async querySpaceAdmins({
    space,
  }: QuerySpaceAdminsInput): Promise<FetchedData> {
    const fetchedData: { [address: string]: number } = {};
    const spaceAdmins = await this._querySpaceAdmins(space);
    for (const spaceAdmin of spaceAdmins.spaces[0].admins) {
      fetchedData[spaceAdmin] = 1;
    }
    return fetchedData;
  }

  private _querySpaceAdmins(space: string): Promise<QuerySpaceAdminsOutput> {
    return this.query<QuerySpaceAdminsOutput>(
      gql`
        query Spaces($space: String!) {
          spaces(where: { id: $space }) {
            admins
          }
        }
      `,
      {
        space,
      }
    );
  }

  public async querySpaceAdminsCount({
    space,
  }: QuerySpaceAdminsInput): Promise<number> {
    const admins = await this.querySpaceAdmins({ space });
    return Object.keys(admins).length;
  }

  /**
   * Retrieves space voters from Snapshot.
   * This takes a long time because it needs to query all voters in SnapShot
   *
   * @param {QuerySpaceVotersAboveXInput} input - Contains parameters for the function:
   *    @param {string} space - Optional - A string representing the space parameter of the query.
   *    @param {number} abovex - Optional - A number that defines the minimum number of votes for an author to be included in the result.
   *
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object containing fetched data with author addresses as keys and their corresponding vote count as values.
   */
  public async querySpaceVotersAboveX({
    space,
    abovex,
  }: QuerySpaceVotersAboveXInput): Promise<FetchedData> {
    const chunkSize = 1000;
    let created_gt = 0;
    let downloadNumber = 0;
    let currentChunkVoters: { voter: string; created: number }[] = [];
    const fetchedData: { [address: string]: number } = {};

    do {
      currentChunkVoters = (
        await this._querySpaceVotersAboveX(space, created_gt, chunkSize)
      ).votes;

      for (const currentChunkVoter of currentChunkVoters) {
        if (!fetchedData[currentChunkVoter.voter]) {
          fetchedData[currentChunkVoter.voter] = 1;
        } else {
          fetchedData[currentChunkVoter.voter] += 1;
        }
        created_gt = currentChunkVoter.created;
      }

      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading ... (${downloadNumber})`);
      downloadNumber += currentChunkVoters.length;
    } while (currentChunkVoters.length > 0);

    const aboveXFetchedData: FetchedData = {};

    if (abovex) {
      for (const [key, value] of Object.entries(fetchedData)) {
        if (value >= abovex) {
          aboveXFetchedData[key] = value;
        }
      }
      return aboveXFetchedData;
    } else {
      return fetchedData;
    }
  }

  private async _querySpaceVotersAboveX(
    space: string,
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

  public async querySpaceVotersAboveXCount({
    space,
    abovex,
  }: QuerySpaceVotersAboveXInput): Promise<number> {
    const voters = await this.querySpaceVotersAboveX({ space, abovex });
    return Object.keys(voters).length;
  }

  /**
   * Retrieves proposal authors with votes above a specified number from a specified space and proposal state.
   * This takes a long time because it needs to query all proposals in SnapShot
   *
   * @param {QueryProposalAuthorsAboveXInput} input - Contains parameters for the function:
   *    @param {string} space - Optional - A string representing the space parameter of the query.
   *    @param {number} abovex - Optional - A number that defines the minimum number of votes for an author to be included in the result.
   *    @param {string} state - Optional - A string that represents the state of the proposals which can be 'active', 'closed', 'pending', or 'successful'.
   *
   * @returns {Promise<FetchedData>} - A Promise that resolves to an object containing fetched data with author addresses as keys and their corresponding vote count as values.
   */
  public async queryProposalAuthorsAboveX({
    space,
    abovex,
    state,
  }: QueryProposalAuthorsAboveXInput): Promise<FetchedData> {
    const chunkSize = 1000;
    let created_gt = 0;
    let downloadNumber = 0;
    let currentChunkAuthors: { author: string; created: number }[] = [];
    const fetchedData: { [address: string]: number } = {};

    if (state) {
      state.toLowerCase();
      const validStates = ["active", "closed", "pending", "successful"];
      if (!validStates.includes(state)) {
        throw new Error(
          `Invalid state parameter. Valid states are: "active", "closed", "pending", "successful"`
        );
      }
    }

    do {
      currentChunkAuthors = (
        await this._queryProposalAuthorsAboveX(
          space,
          state,
          created_gt,
          chunkSize
        )
      ).proposals;

      for (const currentChunkAuthor of currentChunkAuthors) {
        if (!fetchedData[currentChunkAuthor.author]) {
          fetchedData[currentChunkAuthor.author] = 1;
        } else {
          fetchedData[currentChunkAuthor.author] += 1;
        }
        created_gt = currentChunkAuthor.created;
      }

      readline.cursorTo(process.stdout, 0);
      process.stdout.write(`downloading ... (${downloadNumber})`);
      downloadNumber += currentChunkAuthors.length;
    } while (currentChunkAuthors.length > 0);

    const aboveXFetchedData: FetchedData = {};
    if (abovex) {
      for (const [key, value] of Object.entries(fetchedData)) {
        if (value >= abovex) {
          aboveXFetchedData[key] = value;
        }
      }
      return aboveXFetchedData;
    } else {
      return fetchedData;
    }
  }

  private async _queryProposalAuthorsAboveX(
    space: string | undefined,
    state: string | undefined,
    created_gt = 0,
    chunkSize = 1000
  ): Promise<QuerySpaceAuthorsOutput> {
    if (space && state) {
      return this.query<QuerySpaceAuthorsOutput>(
        gql`
          query Authors(
            $space: String
            $state: String
            $created_gt: Int!
            $chunkSize: Int!
          ) {
            proposals(
              first: $chunkSize
              where: { space: $space, state: $state, created_gt: $created_gt }
              orderBy: "created"
              orderDirection: asc
            ) {
              author
              created
            }
          }
        `,
        {
          space,
          state,
          chunkSize,
          created_gt,
        }
      );
    } else if (space) {
      return this.query<QuerySpaceAuthorsOutput>(
        gql`
          query Authors($space: String, $created_gt: Int!, $chunkSize: Int!) {
            proposals(
              first: $chunkSize
              where: { space: $space, created_gt: $created_gt }
              orderBy: "created"
              orderDirection: asc
            ) {
              author
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
    } else if (state) {
      return this.query<QuerySpaceAuthorsOutput>(
        gql`
          query Authors($state: String, $created_gt: Int!, $chunkSize: Int!) {
            proposals(
              first: $chunkSize
              where: { state: $state, created_gt: $created_gt }
              orderBy: "created"
              orderDirection: asc
            ) {
              author
              created
            }
          }
        `,
        {
          state,
          chunkSize,
          created_gt,
        }
      );
    } else {
      return this.query<QuerySpaceAuthorsOutput>(
        gql`
          query Authors($created_gt: Int!, $chunkSize: Int!) {
            proposals(
              first: $chunkSize
              where: { created_gt: $created_gt }
              orderBy: "created"
              orderDirection: asc
            ) {
              author
              created
            }
          }
        `,
        {
          chunkSize,
          created_gt,
        }
      );
    }
  }

  public async queryProposalAuthorsAboveXCount({
    space,
    abovex,
    state,
  }: QueryProposalAuthorsAboveXInput): Promise<number> {
    const authors = await this.queryProposalAuthorsAboveX({
      space,
      abovex,
      state,
    });
    return Object.keys(authors).length;
  }
}
