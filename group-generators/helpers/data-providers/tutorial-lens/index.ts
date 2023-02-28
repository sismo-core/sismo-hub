// import the queries
import {
  getPublicationStatsQuery,
  getWhoCollectedPublicationQuery,
} from "./queries";
// import the types
import {
  GetWhoCollectedPublicationType,
  PublicationId,
  Wallet
} from "./types";
// import the GraphQL Provider
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
// Import the fetchData type
import { FetchedData } from "topics/group";

export class TutorialLensProvider extends GraphQLProvider {
  constructor() {
    super({
      // url of the API
      url: "https://api.lens.dev",
    });
  }
  
  // method that create the fetchData object
  public async getWhoCollectedPublication(
    publication: PublicationId
  ): Promise<FetchedData> {
    const dataProfiles: FetchedData = {};
    for await (const item of this._getWhoCollectedPublication(publication)) {
      dataProfiles[item.address] = 1;
    }
    return dataProfiles;
  }

  // method that iterate on the getWhoCollectedPublicationQuery
  private async *_getWhoCollectedPublication({
    publicationId,
  }: PublicationId): AsyncGenerator<Wallet, void, undefined> {
    let cursor = "";
    let lensCollectors: GetWhoCollectedPublicationType;
    // fetch data as long as there is data
    do {
      lensCollectors = await getWhoCollectedPublicationQuery(
        this,
        publicationId,
        cursor
      );
      yield* lensCollectors.whoCollectedPublication.items;
      cursor = lensCollectors.whoCollectedPublication.pageInfo.next;
    } while (lensCollectors.whoCollectedPublication.items.length > 0);
  }

  public async getPublicationCollectorsCount(
    publication: PublicationId
  ): Promise<number> {
    const publicationStats = await getPublicationStatsQuery(
      this,
      publication.publicationId
    );
    return publicationStats.publication.stats.totalAmountOfCollects;
  }
}