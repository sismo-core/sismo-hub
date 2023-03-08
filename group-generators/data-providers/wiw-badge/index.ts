import axios from "axios";
import { QueryAllBadgeHoldersInput } from "@group-generators/data-providers/wiw-badge/types";
import { FetchedData } from "topics/group";

export class WiwBadgeProvider {
  apiUrl: string;
  maxRetry: number;

  public constructor() {
    this.maxRetry = 3;
    this.apiUrl = "https://api.wiw.io";
  }

  /**
   * Use this method to query latest holders of a specific WIW badge.
   * @param input The tag id of WIW badge in https://app.wiw.io/tag-library
   * @param defaultValue Define the value of all the items (Holder addresses) of the object returned.
   */
  public async queryBadgeHolders(
    input: QueryAllBadgeHoldersInput,
    defaultValue = 1
  ): Promise<FetchedData> {
    const fetchedData: { [address: string]: number } = {};

    for (let retry = 0; retry < this.maxRetry; ++retry) {
      try {
        const { data: responseData } = await axios({
          url: `${this.apiUrl}/public/tags/id/${input.tagId}/addresses`,
          method: "get",
        });
        for (const holderAddress of responseData.addresses) {
          fetchedData[holderAddress] = defaultValue;
        }
        return fetchedData;
      } catch (error: any) {
        console.log(error);
        // Only retry on '429 Too Many Requests'
        if (error.response && error.response.status == 429) {
          await new Promise((f) => setTimeout(f, 1100));
        } else {
          throw new Error(error);
        }
      }
    }

    throw new Error(
      `Cannot reach WIW API after retrying ${this.maxRetry} times.`
    );
  }

  public async queryBadgeHoldersCount(
    input: QueryAllBadgeHoldersInput
  ): Promise<number> {
    for (let retry = 0; retry < this.maxRetry; ++retry) {
      try {
        const { data: responseData } = await axios({
          url: `${this.apiUrl}/public/tags/id/${input.tagId}`,
          method: "get",
        });
        return responseData.rarity;
      } catch (error: any) {
        console.log(error);
        // Only retry on '429 Too Many Requests'
        if (error.response && error.response.status == 429) {
          await new Promise((f) => setTimeout(f, 1100));
        } else {
          throw new Error(error);
        }
      }
    }

    throw new Error(
      `Cannot reach WIW API after retrying ${this.maxRetry} times.`
    );
  }
}
