// import { GET_ALL_VOTERS } from "./queries";
import { gql } from "graphql-request";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { GraphQLProvider } from "@group-generators/helpers/data-providers/graphql";
import { Tags, ValueType, GroupWithData, AccountSource, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

type Owner = {
  owner: {
    id: string;
  }
};

type MintedBadges = Owner[];

type ResponseMintedBadges = {
  mintedBadges: MintedBadges;
};

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const sismoMainnets = new dataProviders.GraphQLProvider({
      url: "https://api.sismo.io/",
    });

    const sismoTestnets = new dataProviders.GraphQLProvider({
      url: "https://api.testnets.sismo.io/",
    });

    const fetchHolders = async (provider: GraphQLProvider, network: string): Promise<FetchedData> => {
      const badgeHolders: FetchedData = {};
      const step = 10000;
      let skip = 0;
      let continueFetch = true;

      while (continueFetch) {
        const res: ResponseMintedBadges = await provider.query(
          gql`
            query {
              mintedBadges(first: ${step}, skip: ${skip}, network: ${network}) {
                owner {
                  id
                }
              }
            }
          `,
        );
  
        const mintedBadges: MintedBadges = res.mintedBadges;
        mintedBadges.forEach((holder: Owner) => {
          badgeHolders[holder.owner.id] = 1;
        });
        if(res.mintedBadges.length == 0) {
          continueFetch = false;
        }
        skip = skip + step;
      }

      return badgeHolders;
    };

    const goerliHolders: FetchedData = await fetchHolders(sismoTestnets, "goerli");
    console.log(`=====> ${Object.keys(goerliHolders).length} goerli holders`);

    const mumbaiHolders: FetchedData = await fetchHolders(sismoTestnets, "mumbai");
    console.log(`=====> ${Object.keys(mumbaiHolders).length} mumbai holders`);

    const mainnetHolders: FetchedData = await fetchHolders(sismoMainnets, "mainnet");
    console.log(`=====> ${Object.keys(mainnetHolders).length} mainnet holders`);

    const gnosisHolders: FetchedData = await fetchHolders(sismoMainnets, "gnosis");
    console.log(`=====> ${Object.keys(gnosisHolders).length} gnosis holders`);

    const polygonHolders: FetchedData = await fetchHolders(sismoMainnets, "polygon");
    console.log(`=====> ${Object.keys(polygonHolders).length} polygon holders`);

    const holders = dataOperators.Union([ 
      goerliHolders,
      mainnetHolders,
      gnosisHolders,
      polygonHolders,
      mumbaiHolders, 
    ]);

    return [
      {
        name: "sismo-zk-badges-holders",
        timestamp: context.timestamp,
        description: "Sismo ZK Badge holders",
        specs: "This Group consists of all addresses holding a ZK Badge before DD-MM-YYY",
        data: holders,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;