import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, FetchedData, AccountSource } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const subgraph = new dataProviders.GraphQLProvider({
      url: "https://api.thegraph.com/subgraphs/name/andreimvp/pohv1-test",
    });

    const pohData: FetchedData = {};

    type PoHSubmissions = { submissions: { id: string; creationTime: number }[] };

    const step = 1000;
    let next = 0;
    let pohSubmissions: PoHSubmissions;
    do {
      pohSubmissions = await subgraph.query<PoHSubmissions>(
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
      if (pohSubmissions.submissions.length > 0) {
        next = pohSubmissions.submissions[pohSubmissions.submissions.length - 1].creationTime;
      }
    } while (pohSubmissions.submissions.length > 0);

    return [
      {
        name: "proof-of-humanity",
        displayName: "Proof of Humanity Registrants",
        timestamp: context.timestamp,
        description: "Data Group of all humans registered on Proof of Humanity (POH)",
        specs: "Contains all addresses registered as human on Proof of Humanity (POH)",
        data: pohData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.SybilResistance, Tags.User, Tags.Maintained],
      },
    ];
  },
};

export default generator;
