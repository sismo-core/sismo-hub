import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
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
        name: "my-badge",
        timestamp: context.timestamp,
        data: {
          "0x4fE60641cf1053fC7f1c8CAe9e1de19DD803326d": "1",
          "github:mrass-lmk": "1",
        },
        accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
