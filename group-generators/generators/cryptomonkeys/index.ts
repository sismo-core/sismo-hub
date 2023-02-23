
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
    
    const githubProviderData0 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "spikelov/big"],
    });

    return [
      {
        name: "cryptomonkeys",
        timestamp: context.timestamp,
        description: "Be a member of group and chat https://t.me/nefomoeb, be a member of group ABUZ Put an asterisk here https://github.com/spikelov/Cryptomonkeys",
        specs: "Be a member of group and chat https://t.me/nefomoeb, be a member of group ABUZ Put an asterisk here https://github.com/spikelov/Cryptomonkeys",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
