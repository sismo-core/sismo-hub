/* istanbul ignore file */
import axios from "axios";
import { utils } from "ethers";
import { IResolver } from "./resolver";

export class GithubResolver implements IResolver {
  url: string;
  headers: {
    Accept: string;
    Authorization?: string;
  };
  private _githubAuthToken: string | undefined;

  constructor(githubAuthToken = process.env.GITHUB_TOKEN) {
    this.url = "https://api.github.com/";
    this._githubAuthToken = githubAuthToken;
    this.headers = {
      Accept: "application/vnd.github+json",
      ...(this._githubAuthToken
        ? { Authorization: `Bearer ${this._githubAuthToken}` }
        : {}),
    };
  }

  resolve = async (login: string): Promise<string> => {
    const res = await axios({
      url: `${this.url}users/${login.slice(7)}`,
      method: "GET",
      headers: this.headers,
    }).catch((error) => {
      console.log(error);
      const errorMessage = error.response.data.message as string;
      if (errorMessage.includes("API rate limit")) {
        throw new Error(
          "Github API rate limit, please add your own Authenticated Github token (see here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)\n"
        );
      }
      throw new Error("Error while fetching");
    });

    const resolvedAccount = `0x1001${utils
      .hexZeroPad(`0x${res.data.id}`, 20)
      .slice(6)}`;

    return resolvedAccount;
  };
}
