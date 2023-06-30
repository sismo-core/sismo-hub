import { gql } from "graphql-request";
import { areRegistred, areRegistredWithRandomness } from "./utils";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  FetchedData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const subgraph = 
      new dataProviders.GraphQLProvider({
        url: "https://api.thegraph.com/subgraphs/name/andreimvp/pohv1-test",
      });

    const pohData: FetchedData = {};

    type PoHSubmissions = { submissions: { id: string, creationTime: number }[] };

    const step = 1000;
    let next = 0;
    let pohSubmissions: PoHSubmissions;
    do {
      pohSubmissions =
        await subgraph.query<PoHSubmissions>(
          gql`
        query getValidPoHSubmissions {
          submissions(where:{creationTime_gt:"${next}", registered: true, submissionTime_gte: 1624852604}, first: ${step}, orderBy: creationTime, orderDirection: asc) {
            id
            creationTime
          }
        }
      `
        );
      for (const submission of pohSubmissions.submissions) {
        pohData[submission.id] = 1;
      }
      console.log(`pohData10k: Fetched ${Object.keys(pohData).length} PoH submissions`);
      if(pohSubmissions.submissions.length > 0) {
        next = pohSubmissions.submissions[pohSubmissions.submissions.length - 1].creationTime;
      }
    } while (pohSubmissions.submissions.length > 0);

    await areRegistredWithRandomness(pohData, 100);
    // await areRegistred(pohData, 200);


    // ------------------- TO REMOVE (tests) ----------------------

    // const pohData17k: FetchedData = {};

    // let next2 = 0;
    // let pohSubmissions2: PoHSubmissions;
    // do {
    //   pohSubmissions2 =
    //     await subgraph.query<PoHSubmissions>(
    //       gql`
    //     query getValidPoHSubmissions {
    //       submissions(where:{creationTime_gt:"${next2}", registered: true}, first: ${step}, orderBy: creationTime, orderDirection: asc) {
    //         id
    //         creationTime
    //       }
    //     }
    //   `
    //     );
    //   for (const submission of pohSubmissions2.submissions) {
    //     pohData17k[submission.id] = 1;

    //   }
    //   console.log(`pohData17k: Fetched ${Object.keys(pohData17k).length} PoH submissions`);
    //   if(pohSubmissions2.submissions.length > 0) {
    //     next2 = pohSubmissions2.submissions[pohSubmissions2.submissions.length - 1].creationTime;
    //   }
    // } while (pohSubmissions2.submissions.length > 0);

    // // get the diff between the two sets
    // const diff: FetchedData = {};

    // for (const submission of Object.keys(pohData17k)) {
    //   if(!pohData[submission]) {
    //     diff[submission] = 1;
    //   }
    // }

    // console.log(`Diff (pohData17k - pohData10k): ${Object.keys(diff).length} PoH submissions`);

    // await areRegistred(diff, Object.keys(diff).length);

    // ------------------- TO REMOVE (tests) ----------------------

    // const subgraphHostedServiceProvider =
    // new dataProviders.SubgraphDecentralizedServiceProvider({
    //   // Proof of Humanity Subgraph
    //   // https://thegraph.com/explorer/subgraph?id=CvzNejNZR2UTQ66wL7miGgfWh9dmiwgTtTfgQCBvMQRE&view=Overview
    //   subgraphId: "CvzNejNZR2UTQ66wL7miGgfWh9dmiwgTtTfgQCBvMQRE",
    // });

    // const pohData3: FetchedData = {};

    // type PoHSubmissions3 = { submissions: { id: string }[] };

    // const step3 = 1000;
    // let counter = 0;
    // let pohSubmissions3: PoHSubmissions3;
    // do {
    //   pohSubmissions3 =
    //     await subgraphHostedServiceProvider.query<PoHSubmissions3>(
    //       gql`
    //     query getValidPoHSubmissions {
    //       submissions(where:{registered:true, disputed:false}, first: ${step3}, skip:${counter}) {
    //         id
    //       }
    //     }
    //   `
    //     );
    //   for (const submission of pohSubmissions3.submissions) {
    //     pohData3[submission.id] = 1;
    //   }
    //   counter += step3;
    // } while (pohSubmissions3.submissions.length > 0);

    // await areRegistredWithRandomness(pohData3, 100);

    // ------------------- TO REMOVE (tests) ----------------------

    return [
      {
        name: "proof-of-humanity",
        timestamp: context.timestamp,
        description: "Prove you are a human with PoH",
        specs: "Appear as a verified Proof of Humanity submission on the Proof of Humanity subgraph",
        data: pohData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.SybilResistance, Tags.User],
      },
    ];
  },
};

export default generator;
