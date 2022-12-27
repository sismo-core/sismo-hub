
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
  dependsOn: ["sismo-masquerade-lens-followers","ethereum-power-users","gitcoin-grants-rounds-donors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoMasqueradeLensFollowersGroupLatest = await groupStore.latest(
      "sismo-masquerade-lens-followers"
    );
    
    const sismoMasqueradeLensFollowersData0 = dataOperators.Map(
      await sismoMasqueradeLensFollowersGroupLatest.data(),
      1
    );
    
    const ethereumPowerUsersGroupLatest = await groupStore.latest(
      "ethereum-power-users"
    );
    
    const ethereumPowerUsersData1 = dataOperators.Map(
      await ethereumPowerUsersGroupLatest.data(),
      1
    );
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-rounds-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData2 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      sismoMasqueradeLensFollowersData0,
      ethereumPowerUsersData1,
      gitcoinGrantsRoundsDonorsData2 
    ]);

    return [
      {
        name: "baster",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
