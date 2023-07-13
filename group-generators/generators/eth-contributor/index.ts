
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
        name: "ethereum-github-contributors",
        timestamp: context.timestamp,
        description: "Data Group of Ethereum contributors on GitHub",
        specs: "Created by the GitHub Data Provider. Contains GitHub contributors of: • ethereum/go-ethereum • ethereum/research • ethereum/solidity. Value for each group member is the total number of contribution for all the Repos.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};

export default generator;
