
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
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "virajpatva/ExchangeSmartContract" ]
    });

    return [
      {
        name: "exchange-smart-contract",
        timestamp: context.timestamp,
        description: "This will allow to mint NFT",
        specs: "NFT",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
