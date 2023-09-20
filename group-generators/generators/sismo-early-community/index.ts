
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
  dependsOn: ["sismo-community"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoCommunityGroupLatest = await groupStore.latest(
      "sismo-community"
    );
    
    const sismoCommunityData0 = dataOperators.Map(
      await sismoCommunityGroupLatest.data(),
      1
    );

    return [
      {
        name: "sismo-early-community",
        timestamp: context.timestamp,
        description: "Data Group of Sismo Early Community members",
        specs: "This groups consists of Sismo Early Community members, generated from a snapshot of Sismo Community Data Group on July 11, 2023.",
        data: sismoCommunityData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
