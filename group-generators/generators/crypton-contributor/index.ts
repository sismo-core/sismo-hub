import { dataProviders } from "@group-generators/helpers/data-providers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["zk-developer-contributor", "zk-hack", "zk-hack-iii-sismo-workshop"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  const githubProvider = new dataProviders.GithubProvider();

const githubProviderData0 =
      await githubProvider.getRepositoriesContributors({
        repositories: [
          "lambdaclass/cairo-rs",
          "lambdaclass/lambdaworks",
          "lambdaclass/aleo_lambda_blockchain",
          "lambdaclass/starknet_in_rust",
          "lambdaclass/kakarot",
        ],
      });
    
    const zkDeveloperContributorGroupLatest = await groupStore.latest(
      "zk-developer-contributor"
    );
    
    const zkDeveloperContributorData1 = dataOperators.Map(
      await zkDeveloperContributorGroupLatest.data(),
      1
    );

const zkHackGroupLatest = await groupStore.latest("zk-hack");
    const zkHackData2 = dataOperators.Map(await zkHackGroupLatest.data(), 1);

const zkHackIiiSismoWorkshopGroupLatest = await groupStore.latest(
      "zk-hack-iii-sismo-workshop"
    );

    const zkHackIiiSismoWorkshopData3 = dataOperators.Map(
      await zkHackIiiSismoWorkshopGroupLatest.data(),
      1
    );

 const dataUnion = dataOperators.Union([
      githubProviderData0,
      githubProviderData1,
      githubProviderData2,
      githubProviderData3,
]);

    return [
      {
        name: "crypton-contributor",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
