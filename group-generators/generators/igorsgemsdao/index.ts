import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const jsonListData0 = {
      "0x95cB32be2265A0522C283D004632eb613537f49C": "1",
    };

    return [
      {
        name: "igorsgemsdao",
        timestamp: context.timestamp,
        description: "Members of a closed telegram group.",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
