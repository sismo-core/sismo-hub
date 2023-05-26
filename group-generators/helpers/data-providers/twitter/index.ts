import { GetFollowersInput } from "./types";
import { FetchedData } from "topics/group";

/*
GET https://api.twitter.com/2/users/:id/followers

WARNING: requires follows.read permission added in commitment mapper (might look suspicious to the user adding his twitter account)
TODO: fetch token from commitment mapper
TODO: make request on behalf of user
TODO: implement result pagination

My User ID: 1659633330508185607
Elon Musk User ID: 44196397
*/

export class TwitterProvider {

  public async getFollowers(getFollowersInput: GetFollowersInput): Promise<FetchedData> {
    console.log(`userID: ${getFollowersInput.userID}`);

    // fetch token from the commitment mapper
    // get followers from api

    const followers: FetchedData = {};

    followers["twitter:CharlsCharls_:862253249994293248"] = 1;
    followers["twitter:Baoufa:971701818"] = 1;
    // followers["twitter:81411930"] = 1;

    return followers;
  }

  public async getFollowersCount(getFollowersInput: GetFollowersInput): Promise<number> {
    const followers = await this.getFollowers(getFollowersInput);
    return Object.keys(followers).length;
  }
}

/*
{
  "data": [
    {
      "id": "862253249994293248",
      "name": "CharlsCharls.sismo.eth \uD83C\uDFAD\uD83D\uDC8E",
      "username": "CharlsCharls_"
    },
    {
      "id": "971701818",
      "name": "\uD83C\uDF44\uD83C\uDF44\uD83C\uDF44 ben.anoufa.eth \uD83C\uDFAD \uD83C\uDF44\uD83C\uDF44\uD83C\uDF44",
      "username": "Baoufa"
    },
    {
      "id": "1624354887722057729",
      "name": "ZKentin \uD83D\uDD1C ETHGlobal Waterloo",
      "username": "ZKentin_"
    },
    {
      "id": "1176265798941380611",
      "name": "martingbz.eth \uD83C\uDFAD\uD83D\uDC8E\uD83E\uDD87\uD83D\uDD0A",
      "username": "0xMartinGbz"
    },
    {
      "id": "81411930",
      "name": "Willa",
      "username": "HotDealsNStuff"
    },
    {
      "id": "2884809765",
      "name": "bigq \uD83C\uDFAD",
      "username": "big_q__"
    },
    {
      "id": "1448915213877661696",
      "name": "leo21.sismo.eth \uD83D\uDC8E\uD83C\uDFAD",
      "username": "leo21_eth"
    },
    {
      "id": "2390703980",
      "name": "dhadrien.sismo.eth \uD83C\uDFAD\uD83D\uDC8E",
      "username": "dhadrien_"
    }
  ],
  "meta": {
    "result_count": 8
  }
}
*/