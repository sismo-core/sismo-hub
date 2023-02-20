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
        name: "dhadrien-friends",
        timestamp: context.timestamp,
        description: "my friends",
        specs: "",
        data: {
          "0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6": "1",
          "github:timbeiko": "1",
        },
        accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
