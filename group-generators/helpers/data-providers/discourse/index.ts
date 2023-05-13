import axios from "axios";
import { ethers } from "ethers";
import { ApiConfig } from "./types";
import { FetchedData } from "topics/group";

class DiscourseProvider {
  public async getAllUsersFromAPI({ url }: ApiConfig): Promise<FetchedData> {
    const usersData: FetchedData = {};

    const firstPageUrl = "/directory_items.json?period=daily&order=days_visited"
    let queryUrl = `${url}${firstPageUrl}`

    while (url) {
      const {pageUsersData, nextPageUrl} = await this.getAccountsFromAPI({ url: queryUrl });
      if (pageUsersData.length === 0) break;

      queryUrl = `${url}${nextPageUrl}`;
      const pageAddressesArr = await pageUsersData.filter((user : any) => {
        return user.user.name 
        && user.user.name.length > 32
        && ethers.utils.isAddress(user.user.name.substring(0, 42));
      })
      
      pageAddressesArr.map((user : any) => usersData[user.user.name.substring(0, 42)] = 1)

    }
    return usersData;
  }

  

 /**
   * Use this method to query any rest api with the GET method
   * @param options Used to pass url of the request.
   * @returns The data of the api request which must be in FetchData type { [address: string]: number }
   */
  private async getAccountsFromAPI({ url }: ApiConfig): Promise<any> {
    try {
      const headers = {
        "User-Agent": 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
      };

      const { data: responseData } = await axios({
        url: url,
        method: "get",
        headers
      });
      return { pageUsersData: responseData.directory_items, nextPageUrl : responseData.meta.load_more_directory_items};
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch data...");
    }
  }

   /**
   * Use this method to query any rest api with the GET method and return the number of accounts
   * @param options Used to pass url of the request.
   * @returns The data of the api request which must be in FetchData type { [address: string]: number }
   */
    public async getAccountsCountFromAPI({ url }: ApiConfig): Promise<number> {
      const accounts = await this.getAllUsersFromAPI({ url });
      return Object.keys(accounts).length;
    }
}

export { DiscourseProvider, ApiConfig };
