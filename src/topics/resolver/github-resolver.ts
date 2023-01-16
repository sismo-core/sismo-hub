/* istanbul ignore file */
import axios from "axios";
import { IResolver } from "./resolver";
import { resolveAccount } from "./utils";

export class GithubResolver implements IResolver {
  url: string;
  headers: {
    Accept: string;
    Authorization?: string;
  };
  private _githubAuthToken: string | undefined;

  constructor(githubAuthToken = process.env.SH_GITHUB_TOKEN) {
    this.url = "https://api.github.com/";
    this._githubAuthToken = githubAuthToken;
    this.headers = {
      Accept: "application/vnd.github+json",
      ...(this._githubAuthToken
        ? { Authorization: `Bearer ${this._githubAuthToken}` }
        : {}),
    };
  }

  resolve = async (githubData: string): Promise<string> => {
    const splitGithubData = githubData.split(":");
    if (splitGithubData.length === 3) {
      const id = githubData.split(":")[2];
      const resolvedAccount = resolveAccount("1001", id);
      return resolvedAccount;
    }

    const res = await axios({
      url: `${this.url}users/${splitGithubData[1]}`,
      method: "GET",
      headers: this.headers,
    }).catch((error) => {
      const errorMessage = error.response.data.message as string;
      if (errorMessage.includes("API rate limit")) {
        throw new Error(
          "Github API rate limit, please add your own Authenticated Github token (see here: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)\n"
        );
      }
      console.log(
        `Error while fetching https://github.com/${splitGithubData[1]}. Is it an existing github username?`
      );
      return undefined;
    });

    if (res === undefined) {
      return "undefined";
    }

    const resolvedAccount = resolveAccount("1001", res.data.id);

    return resolvedAccount;
  };
}
