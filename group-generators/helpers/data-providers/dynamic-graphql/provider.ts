import { search } from "jmespath";
import { DynamicGraphQLType } from "./types";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { FetchedData } from "topics/group";

export class DynamicGraphQLProvider extends GraphQLProvider {
  constructor(url?: string) {
    super({ url: url || "" });
  }

  public async getGraphQLQuery({
    graphQLQuery,
    graphQLEndpoint,
    jmesPathQuery,
  }: DynamicGraphQLType): Promise<FetchedData> {
    this.graphQLClient.setEndpoint(graphQLEndpoint);
    return await this.getGraphQLData(graphQLQuery, jmesPathQuery);
  }

  public async getGraphQLQueryCount({
    graphQLQuery,
    graphQLEndpoint,
    jmesPathQuery,
  }: DynamicGraphQLType): Promise<number> {
    const fetchedData = await this.getGraphQLQuery({
      graphQLQuery,
      graphQLEndpoint,
      jmesPathQuery,
    });
    return Object.keys(fetchedData).length;
  }

  private async getGraphQLData(
    graphQLQuery: string,
    jmesPathQuery: string
  ): Promise<FetchedData> {
    const fetchedData: { [address: string]: number } = {};
    const response = await this.query(graphQLQuery);

    console.log(JSON.stringify(response));

    if (Object.keys(response).length === 0) {
      throw new Error(`GraphQL query didn't return any data`);
    }

    const addresses = await this.processJmesPath(response, jmesPathQuery);
    for (const address of addresses) {
      fetchedData[address] = 1;
    }

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
