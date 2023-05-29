import axios from "axios";
import { 
  TwitterAPIUser,
  TwitterAccessToken,
  TwitterUser,
  TwitterUserID
} from "./types";
import { FetchedData } from "topics/group";

export class TwitterProvider {
  private commitmentMapperURL: string;
  private commitmentMapperAuthToken: string;

  constructor(
    commitmentMapperURL = process.env.COMMITMENT_MAPPER_URL,
    commitmentMapperAuthToken = process.env.COMMITMENT_MAPPER_AUTH_TOKEN
    ) {
    if (!commitmentMapperURL || !commitmentMapperAuthToken) {
      throw Error('COMMITMENT_MAPPER_URL and COMMITMENT_MAPPER_AUTH_TOKEN are required.')
    }
    this.commitmentMapperURL = commitmentMapperURL;
    this.commitmentMapperAuthToken = commitmentMapperAuthToken;
    console.log(`Using Commitment Mapper URL: ${commitmentMapperURL}`);
    console.log(`Using Commitment Mapper Auth Token: ${commitmentMapperAuthToken}`);
  }

  /**
   * GET https://api.twitter.com/2/users/:id/followers
   *
   * @param {TwitterUserID} userID 
   * - e.g. 2884809765 (@big_q__), 1438226914309812226 (@Sismo_eth)
   */
  public async getFollowers(
    userID: TwitterUserID,
    defaultValue = 1
  ): Promise<FetchedData> {
    const accessToken = await this.getTwitterAccessToken();
    console.log(`Using Twitter Access Token: ${accessToken}`);
    const apiURL = `https://api.twitter.com/2/users/${userID}/followers`;
    console.log(`Using Twitter v2 API Endpoint: ${apiURL}`);

    const usersSequence = this.getTwitterUsersWithURL(accessToken, apiURL);
    const followers: FetchedData = {};
    for await (const follower of usersSequence) {
      followers[follower] = defaultValue;
    }
    return followers;
  }

  public async getFollowersCount(userID: TwitterUserID): Promise<number> {
    const followers = await this.getFollowers(userID);
    return Object.keys(followers).length;
  }

  private async getTwitterAccessToken(): Promise<TwitterAccessToken> {
    try {
      const res = await axios({
        url: `${this.commitmentMapperURL}/get-twitter-v2-access-token`,
        method: "GET",
        headers: { Authorization: `Bearer ${this.commitmentMapperAuthToken}` }
      });
      return res.data.accessToken;
    } catch(error) {
      console.error(error);
      throw new Error("Cannot fetch Twitter access token from Commitment Mapper");
    }
  }

  private async *getTwitterUsersWithURL(
    accessToken: TwitterAccessToken,
    url: string
  ): AsyncGenerator<TwitterUser, void, undefined> {
    const paginatedURL = new URL(url);
    const maxUsersPerPage = 1000;
    paginatedURL.searchParams.set("max_results", maxUsersPerPage.toString());

    let pageNumber = 1;
    let nextPageToken = "";
    let users: TwitterUser[] = [];
    do {
      if (nextPageToken !== "") { 
        paginatedURL.searchParams.set("pagination_token", nextPageToken);
      }
      console.log(`Fetching page ${pageNumber}: ${paginatedURL}`);
      const res = await axios({
        url: paginatedURL.toString(),
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` }
      }).catch((error) => {
        console.error(error.message);
        throw new Error(`Error fetching page ${pageNumber}: ${paginatedURL.toString()}`);
      });

      users = res.data.data.map((user: TwitterAPIUser) => "twitter:" + user.username + ":" + user.id);
      for (const user of users) {
          yield user;
      }
      pageNumber++;
      nextPageToken = res.data.meta.next_token || "";
    } while (users.length === maxUsersPerPage);
  }
}