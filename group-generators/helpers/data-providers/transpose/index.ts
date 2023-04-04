import { SuccessResponse, TokenHolder, TornadoCashDepositor } from "./types";
import { RestProvider } from "@group-generators/helpers/data-providers/rest-api";

export class TransposeProvider {
  restProvider: RestProvider;
  url: string;
  headers: {
    "X-API-KEY": string;
  };

  public constructor() {
    this.restProvider = new RestProvider();
    this.url = "https://api.transpose.io/sql";
    this.headers = {
      "X-API-KEY": process.env.TRANSPOSE_API_KEY as string,
    };
  }

  public async getQuery(sqlQuery: string): Promise<SuccessResponse> {
    const executeQuery = async (): Promise<SuccessResponse> => {
      const res = await this.restProvider.fetchData({
        url: this.url,
        method: "post",
        headers: this.headers,
        data: { sql: sqlQuery },
      });

      let response: SuccessResponse;

      if (Object(res).status == "success") {
        response = {
          status: Object(res).status,
          stats: Object(res).stats,
          results: Object(res).results,
        };
      } else {
        response = {
          status: "error",
          stats: { count: 0, size: 0, time: 0 },
          results: [],
        };
      }
      return response;
    };

    return await executeQuery();
  }

  public async getTokenHolders(
    tokenAddress: string,
    balanceMin: number,
    balanceMax: number
  ): Promise<TokenHolder[]> {
    const data: SuccessResponse = await this.getQuery(
      `SELECT owner_address, balance FROM ethereum.token_owners WHERE  contract_address = '${tokenAddress}' AND  balance > ${balanceMin} AND balance <= ${balanceMax} ORDER BY balance ASC`
    );
    return data.results as TokenHolder[];
  }

  /**
   *
   * @param tokenAddress The token deposited to Tornado Cash. For ETH the tokenAddress to use is 0x0000000000000000000000000000000000000000.
   * @returns
   */
  public async getTornadoCashDepositors(
    tokenAddress: string
  ): Promise<TornadoCashDepositor[]> {
    const data: SuccessResponse = await this.getQuery(
      `SELECT from_address, quantity/1000000000000000000 AS quantity FROM ethereum.tornado_cash_deposits WHERE token_address = '${tokenAddress}'`
    );
    return data.results as TornadoCashDepositor[];
  }
}
