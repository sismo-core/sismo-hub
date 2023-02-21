import axios, { AxiosResponse } from "axios";
import { ApiConfig } from "./types";
import { FetchedData } from "topics/group";

class RestProvider {
 
 /**
   * Use this method to query any rest api with the GET method
   * @param options Used to pass url of the request.
   * @returns The data of the api request which must be in FetchData type { [address: string]: number }
   */
  public async getAccountsFromAPI({ url }: ApiConfig): Promise<FetchedData> {
    try {
      const { data: responseData } = await axios({
        url: url,
        method: "get",
      });
      return responseData;
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
      const accounts = this.getAccountsFromAPI({ url });
      return Object.keys(accounts).length;
    }


 /**
   * Use this method to query any rest api.
   * @param options Used to pass api config like api url & method of the request.
   * @returns The data of the api request
   */
  public async fetchData({
    url,
    method = "get",
    headers,
    data,
  }: ApiConfig): Promise<AxiosResponse> {
    try {
      const { data: responseData } = await axios({
        url: url,
        method: method,
        headers: headers,
        data: data,
      });
      return responseData;
    } catch (error: any) {
      return Object(error);
    }
  }

  public async withConcurrency<T, K>(
    myItemArray: T[],
    fn: (item: T) => Promise<K>,
    { concurrency = 5 }
  ) {
    const array: K[][] = [];
    let data: K[] = [];
    for (let i = 0; i < myItemArray.length / concurrency; i++) {
      const requests: Promise<K>[] = myItemArray
        .slice(i * concurrency, (i + 1) * concurrency)
        .map(item => fn(item));
      data = await Promise.all(requests);
      array.push(data);
    }
    return array.flat(1);
  }
}

export { RestProvider, ApiConfig };
