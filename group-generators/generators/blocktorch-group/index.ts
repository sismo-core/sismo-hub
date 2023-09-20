
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x41A35ca193dfc8e6E0C89546F10780a41F8A789A": "10",
      "0x785e7f9da3f3471F4DCD10E4c6167A64265B833b": "10",
      "0x4B1D76f16D4342799ccFd2dfb3074591fAaD75F1": "10",
    };

    return [
      {
        name: "blocktorch-group",
        timestamp: context.timestamp,
        description: "blocktorch employees",
        specs: "Data group of the org employees",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
