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
    return [
      {
        name: "my-zk-testing-badge",
        timestamp: context.timestamp,
        data: {
          "0x6a8aB724e0944C7598306bB24F62791D699265b7": "3",
          "0x6a8aB724e0944C7598306bB24F62791D699264b7": "2",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
