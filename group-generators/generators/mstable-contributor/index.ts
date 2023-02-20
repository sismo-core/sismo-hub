
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "mstable/mStable-contracts", "mstable/mStable-apps", "mstable/mStable-subgraphs-monorepo", "mstable/MIPs", "mstable/metavaults", "mstable/frontend", "mstable/mStable-landing" ],
    });

    return [
      {
        name: "mstable-contributor",
        timestamp: context.timestamp,
        description: "Has contributed to mStable repos.",
        specs: "Contributed to mStable's Github repo, either contracts V1, contracts Meta Vault, subgraphs, frontend, apps, landing page or MIPs",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
