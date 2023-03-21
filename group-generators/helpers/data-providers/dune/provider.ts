import { DuneErrorFactory } from './errors';
import {
  QueryParams,
  ExecutionState,
  ExecuteQuery,
  ExecutionStatusComplete,
  ExecutionResults,
  Row,
} from './types';
import { FetchedData } from 'topics/group';

//Dune requires an API key
export class DuneProvider {
  /**
   * Use this method to query Dune Analytics for your data.
   * @param queryId The Dune QueryID e.g. 2034748 https://dune.com/queries/2034748"
   * @param duneEthAddressColumn e.g. “The ETH Address Winner”  for the Dune Query https://dune.com/queries/2034748 -> used to match the ETH addresses
   * @param queryParams optional! e.g. {address: '0x3CAaE25Ee616f2C8E13C74dA0813402eae3F496b', blocknumber: '66257668', chain: 'arbitrum'} for the Dune Query https://dune.com/queries/1618116
   * @returns The FetchedData object in the <FetchedData> Type
   */
  public async executeQuery(
    queryId: number,
    duneEthAddressColumn: string,
    queryParamsObject?: Record<string, string> | null | undefined
  ): Promise<FetchedData> {
    const queryParams = queryParamsObject
      ? (queryParamsObject as QueryParams)
      : undefined;
    const { execution_id, state } = await this.executeNewQuery(
      queryId,
      queryParams
    );

    console.log(
      `\n dune_execution_id is ${execution_id} initial state is ${state} \n depending on size of query and Dune response time, this can take max 30 mins \n`
    );

    await this.getExecutionStatus(execution_id);
    const results = await this.getResults(execution_id);
    return this.formatData(results.result.rows, duneEthAddressColumn);
  }

  public async executeQueryCount(
    queryId: number,
    duneEthAddressColumn?: string,
    queryParamsObject?: Record<string, string> | null | undefined
  ): Promise<number> {
    const queryParams = queryParamsObject
      ? (queryParamsObject as QueryParams)
      : undefined;
    const { execution_id, state } = await this.executeNewQuery(
      queryId,
      queryParams
    );

    console.log(
      `\n dune_execution_id is ${execution_id} initial state is ${state} \n depending on size of query and Dune response time, this can take max 30 mins \n`
    );

    await this.getExecutionStatus(execution_id);
    const results = await this.getResults(execution_id);
    return results.result.metadata.total_row_count;
  }

  private async getExecutionStatus(executionId: string): Promise<string> {
    const startTime = new Date();
    let elapsedSeconds = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      elapsedSeconds = Math.floor(
        (new Date().getTime() - startTime.getTime()) / 1000
      );

      const { state } = await this.getStatus(executionId);

      console.log(
        `Current state is ${state} - it's been ${elapsedSeconds} seconds`
      );

      if (elapsedSeconds === 1800) {
        state === ExecutionState.EXPIRED;
      } else if (state === ExecutionState.COMPLETED) {
        return state;
      } else if (
        state === ExecutionState.EXECUTING ||
        state === ExecutionState.PENDING
      ) {
        continue;
      } else {
        throw DuneErrorFactory.createError(103, state);
      }
    }
  }

  private async executeNewQuery(
    queryId: number,
    queryParams?: QueryParams
  ): Promise<ExecuteQuery> {
    const postResponse = await this.postApiData<ExecuteQuery>(
      `https://api.dune.com/api/v1/query/${queryId}/execute`,
      queryParams
    );
    return postResponse as ExecuteQuery;
  }

  private async getStatus(
    executionId: string
  ): Promise<ExecutionStatusComplete> {
    const getResponse = await this.getApiData<ExecutionStatusComplete>(
      `https://api.dune.com/api/v1/execution/${executionId}/status`
    );
    return getResponse as ExecutionStatusComplete;
  }

  private async getResults(executionId: string): Promise<ExecutionResults> {
    const getResponse = await this.getApiData<ExecutionResults>(
      `https://api.dune.com/api/v1/execution/${executionId}/results`
    );
    return getResponse as ExecutionResults;
  }

  private async postApiData<T>(
    url: string,
    queryParams?: QueryParams
  ): Promise<T> {
    console.log(
      `\n posting to ${url} with query parameters: ${JSON.stringify(
        queryParams
      )}`
    );
    const postResponse = fetch(url, {
      method: 'POST',
      headers: {
        'x-dune-api-key': this.getApiKey(),
      },
      body: JSON.stringify({ query_parameters: queryParams || {} }),
    });
    return this.apiRequestHandler<T>(postResponse);
  }

  private async getApiData<T>(url: string): Promise<T> {
    const getCall = await fetch(url, {
      method: 'GET',
      headers: {
        'x-dune-api-key': this.getApiKey(),
      },
    });
    return this.apiRequestHandler<T>(Promise.resolve(getCall));
  }

  private async apiRequestHandler<T>(
    responsePromise: Promise<Response>
  ): Promise<T> {
    const apiResponse = await responsePromise
      .then((response) => {
        if (!response.ok) {
          throw DuneErrorFactory.createError(response.status, response.url);
        }
        return response.json();
      })
      .catch((error) => {
        throw error;
      });
    if (apiResponse.error) {
      throw DuneErrorFactory.createError(101, apiResponse.error as string);
    }
    return apiResponse;
  }

  private formatData(rows: Row[], duneEthAddressColumn: string): FetchedData {
    const formattedData: FetchedData = {};

    for (const row of rows) {
      formattedData[row[duneEthAddressColumn]] = 1;
    }

    if (formattedData.undefined) {
      throw DuneErrorFactory.createError(102);
    }

    return formattedData;
  }

  private getApiKey(): string {
    if (!process.env.DUNE_API_KEY) {
      throw new Error(
        'DUNE_API_KEY env vars must be set to use the DUNE_API_KEY provider '
      );
    }
    return process.env.DUNE_API_KEY;
  }
}
