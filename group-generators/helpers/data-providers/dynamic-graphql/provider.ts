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

    const response = await this.processGraphQLQuery(
      graphQLQuery,
      jmesPathQuery
    );
    return response;
  }

  private async processGraphQLQuery(
    graphQLQuery: string,
    jmesPathQuery: string
  ): Promise<FetchedData> {
    const response = await this.getGraphQLData(graphQLQuery);
    return this.processJmesPath(response, jmesPathQuery);
  }

  private async processJmesPath(
    graphqlResponse: Record<string, unknown>,
    jmesPathQuery: string
  ): Promise<FetchedData> {
    let addresses: string[] = [];
    // const chunkSize = 10000;
    // let currentChunkIndex = 0;
    // let currentChunkAddresses: string[] = [];

    const jmesPathResponse = search(graphqlResponse, jmesPathQuery);

    if (jmesPathResponse && Array.isArray(jmesPathResponse)) {
      addresses = jmesPathResponse as string[];
    } else {
      throw new Error(`jmespath query $jmesPathQuery} didn't find data`);
    }

    const dict: FetchedData = {};

    for (const address of addresses) {
      dict[address] = 1;
    }
    console.log(dict);
    return dict;
  }

  private async getGraphQLData(
    graphQLQuery: string
  ): Promise<Record<string, unknown>> {
    return this.query(graphQLQuery);
  }
}

//   private async processJmesPath(
//     graphqlResponse: Record<string, unknown>,
//     jmesPathQuery: string
//   ): Promise<FetchedData> {
//     let addresses: string[] = [];
//     const jmesPathResponse = search(graphqlResponse, jmesPathQuery);

//     if (jmesPathResponse && Array.isArray(jmesPathResponse)) {
//       addresses = jmesPathResponse as string[];
//     } else {
//       throw new Error(`jmespath query $jmesPathQuery} didn't find data`);
//     }

//     const dict: FetchedData = {};

//     for (const address of addresses) {
//       dict[address] = 1;
//     }
//     console.log(dict);
//     return dict;
//   }

//   private async getGraphQLData(
//     graphQLQuery: string
//   ): Promise<Record<string, unknown>> {
//     return this.query(graphQLQuery);
//   }
// }
