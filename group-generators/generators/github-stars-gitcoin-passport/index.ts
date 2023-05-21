
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["gitcoin-passport-holders",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const gitcoinPassportHoldersGroupLatest = await groupStore.latest(
      "gitcoin-passport-holders"
    );
    
    const gitcoinPassportHoldersData0 = dataOperators.Map(
      await gitcoinPassportHoldersGroupLatest.data(),
      1
    );
    
    const githubProviderData1 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "filecoin-project/FIPs" ]
    });
    
    const dataUnion = dataOperators.Union([
      gitcoinPassportHoldersData0,
      githubProviderData1 
    ]);

    return [
      {
        name: "github-stars-gitcoin-passport",
        timestamp: context.timestamp,
        description: "Data Group of Gitcoin passport owners and FIP Github repo stargazers ",
        specs: "This data group checks that a user owns a Gitcoin Passport and that it starred the Filecoin Improvement Proposals Github repo",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
