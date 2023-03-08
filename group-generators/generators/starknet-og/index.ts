
import { dataOperators } from "@group-generators/data-operators";
import { dataProviders } from "@group-generators/data-providers";
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
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "starkware-libs/cairo" ],
    });
    
    const githubProviderData1 = await githubProvider.getRepositoriesContributors({
      repositories: [ "starkware-libs/cairo-lang" ],
    });
    
    const dataUnion = dataOperators.Union([ 
      githubProviderData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "starknet-og",
        timestamp: context.timestamp,
        description: "Contributed to Cairo repos",
        specs: "Be part of this new family.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
