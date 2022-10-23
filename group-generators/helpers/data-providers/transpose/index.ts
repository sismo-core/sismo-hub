import { ErrorResponse, SuccessResponse } from "./types";
import { RESTProvider } from "@group-generators/helpers/data-providers/rest-api";

export class TransposeProvider {
  restProvider: RESTProvider;
  url: string;

  public constructor() {
    this.restProvider = new RESTProvider();
    this.url = "https://sql.transpose.io/";
  }

  public async getQuery(sqlQuery: string): Promise<SuccessResponse|ErrorResponse> {
    const executeQuery = async (): Promise<SuccessResponse|ErrorResponse> => {
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
        else if(Object(res).status == "error") {
            response = {
                status: Object(res).status,
                message: Object(res).message,
            }
        }
        else {
            response = {
                status: "",
                message: "",
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
}

