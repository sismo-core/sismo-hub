
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
  dependsOn: ["ethereum-power-users","sismo-early-users","sismo-masquerade-lens-followers","gitcoin-grants-rounds-donors","ens-supporters","rhinofi-power-users","twitter-ethereum-influencers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const ethereumPowerUsersGroupLatest = await groupStore.latest(
      "ethereum-power-users"
    );
    
    const ethereumPowerUsersData0 = dataOperators.Map(
      await ethereumPowerUsersGroupLatest.data(),
      1
    );
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData1 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );
    
    const sismoMasqueradeLensFollowersGroupLatest = await groupStore.latest(
      "sismo-masquerade-lens-followers"
    );
    
    const sismoMasqueradeLensFollowersData2 = dataOperators.Map(
      await sismoMasqueradeLensFollowersGroupLatest.data(),
      1
    );
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-rounds-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData3 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const ensSupportersGroupLatest = await groupStore.latest(
      "ens-supporters"
    );
    
    const ensSupportersData4 = dataOperators.Map(
      await ensSupportersGroupLatest.data(),
      1
    );
    
    const rhinofiPowerUsersGroupLatest = await groupStore.latest(
      "rhinofi-power-users"
    );
    
    const rhinofiPowerUsersData5 = dataOperators.Map(
      await rhinofiPowerUsersGroupLatest.data(),
      1
    );
    
    const twitterEthereumInfluencersGroupLatest = await groupStore.latest(
      "twitter-ethereum-influencers"
    );
    
    const twitterEthereumInfluencersData6 = dataOperators.Map(
      await twitterEthereumInfluencersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      ethereumPowerUsersData0,
      sismoEarlyUsersData1,
      sismoMasqueradeLensFollowersData2,
      gitcoinGrantsRoundsDonorsData3,
      ensSupportersData4,
      rhinofiPowerUsersData5,
      twitterEthereumInfluencersData6 
    ]);

    return [
      {
        name: "pr1mus",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
