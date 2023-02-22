
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
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    const lensProvider = new dataProviders.LensProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "sismo-core/sismo-hub" ],
    });
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "bigq_.lens"
    });
    
    const dataUnion = dataOperators.Union([ 
      githubProviderData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "bigq-frens",
        timestamp: context.timestamp,
        description: "Work with me on the Sismo Hub or follow me on Lens ",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
