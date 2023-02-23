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
        name: "blockimperiumgames",
        timestamp: context.timestamp,
        description: "Be an administrative user of the BlockImperiumGames administrative group",
        specs: "",
        data: {
          "0x7D9a78f607706b8F5cE26Fba6c9EaCabF8937df0": "1",
          "0x0C402267b8fBa9aeE20B194d5d95E88a63955129": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
