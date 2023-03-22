
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
  dependsOn: ["sismo-early-users","treasure"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData0 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );
    
    const treasureGroupLatest = await groupStore.latest(
      "treasure"
    );
    
    const treasureData1 = dataOperators.Map(
      await treasureGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([
      sismoEarlyUsersData0,
      treasureData1 
    ]);

    return [
      {
        name: "petrolistu",
        timestamp: context.timestamp,
        description: "Be friend of Petrolistu",
        specs: "Just be my friend. That's all !",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
