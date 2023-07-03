
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    const lensProvider = new dataProviders.LensProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "junggernaut/go_ethereum_event_fetcher" ]
    });
    
    const jsonListData1 = {
      "0x0210d5A41536e17f82AB3a1bee529DaD819EE096": "1",
    };
    
    const lensProviderData2 = await lensProvider.getFollowers({
      profileId: "sismo.lens"
    });
    
    const dataUnion = dataOperators.Union([
      githubProviderData0,
      jsonListData1,
      lensProviderData2 
    ]);

    return [
      {
        name: "seungan-test",
        timestamp: context.timestamp,
        description: "seungan Test Group",
        specs: "follow follow me",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
