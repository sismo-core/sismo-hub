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
    console.log(response);
    const sampleResponse: FetchedData = { hello: "world" };
    console.log(jmesPathQuery);
    return sampleResponse;
  }

  private async getGraphQLData(
    graphQLQuery: string
  ): Promise<Record<string, unknown>> {
    return this.query(graphQLQuery);
  }
}

//     public async didSellerServiceBuyer({
//     buyerHandle,
//     minimalAmountOfServices = 1,
//   }: DidSellerServiceBuyer): Promise<FetchedData> {
//     return this.processDidSellerServiceBuyer(
//       buyerHandle,
//       minimalAmountOfServices
//     );
//   }

/**
 * Get Talent that worked with a buyer
 */
//   private async processDidSellerServiceBuyer(
//     buyerHandle: string,
//     minimalAmountOfServices: number
//   ): Promise<FetchedData> {
//     const dataProfiles: FetchedData = {};
//     const response: Services = await getFinishedServicesByBuyerQuery(
//       this,
//       buyerHandle
//     );
//     if (response.services.length >= minimalAmountOfServices) {
//       dataProfiles[response.services[0].seller.address] = 1;
//     }
//     return dataProfiles;
//   }
// }

// export const getFinishedServicesByBuyerQuery = async (
//   graphqlProvider: GraphQLProvider,
//   buyerHandle: string
// ): Promise<Services> => {
//   return graphqlProvider.query<Services>(
//     gql`
//       {
//         services(
//           where: {
//             buyer_: {
//               handle: "${buyerHandle}"
//             },
//             status: Finished
//           }
//         ) {
//           id
//           seller {
//             address
//           }
//         }
//       }
//     `
//   );
// };

//   private async executeNewQuery(
//     queryId: number,
//     queryParams?: QueryParams
//   ): Promise<ExecuteQuery> {
//     const postResponse = await this.postApiData<ExecuteQuery>(
//       `https://api.dune.com/api/v1/query/${queryId}/execute`,
//       queryParams
//     );
//     return postResponse as ExecuteQuery;
//   }

//   private async postApiData<T>(
//     url: string,
//     queryParams?: QueryParams
//   ): Promise<T> {
//     // console.log(
//     //   `\n posting to ${url} with query parameters: ${JSON.stringify(
//     //     queryParams
//     //   )}`
//     // );
//     const postResponse = fetch(url, {
//       method: "POST",
//       headers: {
//         "x-dune-api-key": this.getApiKey(),
//       },
//       body: JSON.stringify({ query_parameters: queryParams || {} }),
//     });
//     return this.apiRequestHandler<T>(postResponse);
//   }

//   private async apiRequestHandler<T>(
//     responsePromise: Promise<Response>
//   ): Promise<T> {
//     const apiResponse = await responsePromise
//       .then((response) => {
//         if (!response.ok) {
//           throw DuneErrorFactory.createError(response.status, response.url);
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         throw error;
//       });
//     if (apiResponse.error) {
//       throw DuneErrorFactory.createError(101, apiResponse.error as string);
//     }
//     return apiResponse;
//   }
