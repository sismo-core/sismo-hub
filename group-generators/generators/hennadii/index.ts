
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
      repositories: [ "sismo-core/sismo-protocol" ],
    });
    
    const githubProviderData1 = await githubProvider.getRepositoriesContributors({
      repositories: [ "sismo-core/sismo-hub" ],
    });
    
    const dataUnion = dataOperators.Union([ 
      githubProviderData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "hennadii",
        timestamp: context.timestamp,
        description: "Donate to blockchain projects with confidence",
        specs: "Full-stack developer with 10+ years of experience building web applications using TypeScript, and Node.js. Proficient in developing decentralized applications on the Ethereum blockchain using Solidity and smart contracts. Experienced in building scalable and secure backend infrastructures using cloud services such as GCP, AWS, and Azure",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
