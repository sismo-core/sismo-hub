
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
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "ethereum/go-ethereum" ],
    });
    
    const githubProviderData1 = await githubProvider.getRepositoriesContributors({
      repositories: [ "ethereum/research", "ethereum/solidity" ],
    });
    
    const dataUnion = dataOperators.Union([ 
      githubProviderData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "eth-contributor",
        timestamp: context.timestamp,
        description: "Data group of contributors to go-ethereum, research, and solidity",
        specs: "contribute to one of the go-ethereum, research, and solidity repos in the ethereum github org",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
