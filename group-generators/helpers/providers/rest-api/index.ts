import axios, { AxiosResponse } from "axios";
import { ApiConfig } from "./types";

export class RESTProvider {
  /**
   * Use this method to query any rest api.
   * @param options Used to pass api config like api url & method of the request.
   * @returns The data of the api request
   */
  public async fetchData(options: ApiConfig): Promise<AxiosResponse> {
    try {
      const { data } = await axios({
        url: options.url,
        method: options.method,
        data: options.data,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch data...");
    }
  }
}
