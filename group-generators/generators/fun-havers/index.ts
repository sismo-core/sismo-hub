
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
  dependsOn: ["sismo-masquerade-lens-followers","sismo-early-users","proof-of-humanity"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoMasqueradeLensFollowersGroupLatest = await groupStore.latest(
      "sismo-masquerade-lens-followers"
    );
    
    const sismoMasqueradeLensFollowersData0 = dataOperators.Map(
      await sismoMasqueradeLensFollowersGroupLatest.data(),
      1
    );
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData1 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );
    
    const proofOfHumanityGroupLatest = await groupStore.latest(
      "proof-of-humanity"
    );
    
    const proofOfHumanityData2 = dataOperators.Map(
      await proofOfHumanityGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      sismoMasqueradeLensFollowersData0,
      sismoEarlyUsersData1,
      proofOfHumanityData2 
    ]);

    return [
      {
        name: "fun-havers",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
