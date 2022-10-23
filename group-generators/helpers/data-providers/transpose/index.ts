import { ErrorResponse, SuccessResponse, TokenHolder } from "./types";
import { RESTProvider } from "@group-generators/helpers/data-providers/rest-api";

export class TransposeProvider {
    restProvider: RESTProvider;
    url: string;

    public constructor() {
        this.restProvider = new RESTProvider();
        this.url = "https://sql.transpose.io/";
    }

    public async getQuery(sqlQuery: string): Promise<SuccessResponse> {
        const executeQuery = async (): Promise<SuccessResponse> => {
            const res = await this.restProvider.fetchData({
                url: this.url,
                method: "post",
                headers: {"X-API-KEY":""},
                data : {"sql":sqlQuery}
            });

            let response : SuccessResponse | ErrorResponse; 

            if(Object(res).status == "success") {
                response = {
                    status: Object(res).status,
                    stats: Object(res).stats,
                    results: Object(res).results
                }
            }
            // else if(Object(res).status == "error") {
            //     response = {
            //         status: Object(res).status,
            //         message: Object(res).message,
            //     }
            // }
            else {
                response = {
                    status: "error",
                    stats: {count: 0, size: 0, time: 0},
                    results: []
                }
            }

            return response;
        }

        console.log('executeQuery')
        const response = await executeQuery();

        console.log('response')
        console.log(response)

        return response;
    }

    public async getTokenHolders(tokenAddress: string, balanceMin: number, balanceMax: number): Promise<TokenHolder[]> {
        const data: SuccessResponse = await this.getQuery(`SELECT owner_address, balance FROM ethereum.token_owners WHERE  contract_address = '${tokenAddress}' AND  balance > ${balanceMin} AND balance <= ${balanceMax} ORDER BY balance ASC`)
        return data.results as TokenHolder[];
    }
}
