
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["gitcoin-grants-rounds-donors","sismo-contributors","rhinofi-power-users","ens-supporters","twitter-ethereum-influencers",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-rounds-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData0 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData1 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );
    
    const rhinofiPowerUsersGroupLatest = await groupStore.latest(
      "rhinofi-power-users"
    );
    
    const rhinofiPowerUsersData2 = dataOperators.Map(
      await rhinofiPowerUsersGroupLatest.data(),
      1
    );
    
    const ensSupportersGroupLatest = await groupStore.latest(
      "ens-supporters"
    );
    
    const ensSupportersData3 = dataOperators.Map(
      await ensSupportersGroupLatest.data(),
      1
    );
    
    const twitterEthereumInfluencersGroupLatest = await groupStore.latest(
      "twitter-ethereum-influencers"
    );
    
    const twitterEthereumInfluencersData4 = dataOperators.Map(
      await twitterEthereumInfluencersGroupLatest.data(),
      1
    );
    
    const jsonListData5 = {
      "0x71648d760570A70E76065291b996BCF9D362aF61": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      gitcoinGrantsRoundsDonorsData0,
      sismoContributorsData1,
      rhinofiPowerUsersData2,
      ensSupportersData3,
      twitterEthereumInfluencersData4,
      jsonListData5 
    ]);

    return [
      {
        name: "cryptohomo",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
