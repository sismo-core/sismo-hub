import readline from "readline";
import { search } from "jmespath";
import { DynamicGraphQLType } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class DynamicGraphQLProvider extends GraphQLProvider {
  constructor(url: string) {
    super({ url: url || "" });
  }

  public async getGraphQLQuery({
    graphQLQuery,
    graphQLEndpoint,
    jmesPathQuery,
  }: DynamicGraphQLType): Promise<FetchedData> {
    this.graphQLClient.setEndpoint(graphQLEndpoint);
    graphQLQuery = this.removePagination(graphQLQuery);
    return await this.getGraphQLData(graphQLQuery, jmesPathQuery);
  }

  private removePagination(graphQLQuery: string): string {
    return graphQLQuery
      .replace(/(\n|\s)+first\s*:\s*\d+(\n|\s)+/g, "$1")
      .replace(/(\n|\s)+skip\s*:\s*\d+(\n|\s)*/g, "$1")
      .replace(/(\n|\s)+(before|after)\s*:\s*".*?"(\n|\s)*/g, "$1")
      .replace(/(\n|\s)+last\s*:\s*\d+(\n|\s)+/g, "$1");
  }

  private async getGraphQLData(
    graphQLQuery: string,
    jmesPathQuery: string
  ): Promise<FetchedData> {
    const chunkSize = 10000;
    let currentChunkIndex = 0;
    const fetchedData: { [address: string]: number } = {};
    let currentChunkAddresses: Record<string, unknown>;
    let numberOfResponses = 0;

    //add paging to query
    const graphQLQueryWithPagination = `${graphQLQuery}
      first: ${chunkSize},
      skip: ${currentChunkIndex * chunkSize}
    `;

    do {
      currentChunkAddresses = await this.query<Record<string, unknown>>(
        graphQLQueryWithPagination
      );

      numberOfResponses = Object.keys(currentChunkAddresses).length;
      if (numberOfResponses > 0) {
        const currentAddresses = await this.processJmesPath(
          currentChunkAddresses,
          jmesPathQuery
        );

        for (const address of currentAddresses || []) {
          fetchedData[address] = 1;
        }

        currentChunkIndex++;
      }
    } while (numberOfResponses > 0);

    readline.cursorTo(process.stdout, 0);

    return fetchedData;
  }

  private async processJmesPath(
    graphqlResponse: Record<string, unknown>,
    jmesPathQuery: string
  ): Promise<string[]> {
    let addresses: string[] = [];
    const jmesPathResponse = search(graphqlResponse, jmesPathQuery);

    if (jmesPathResponse && Array.isArray(jmesPathResponse)) {
      addresses = jmesPathResponse as string[];
    } else {
      throw new Error(`jmespath query $jmesPathQuery} didn't find data`);
    }
    return addresses;
  }
}
