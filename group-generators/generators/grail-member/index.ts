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
        name: "grail-member",
        timestamp: context.timestamp,
        description: "Whitelist exported from Grail",
        specs: "Be a member on Grail",
        data: {
          "0x972f37637a03e94FFBf84C1d9F5a9F31bF800DE9": "1",
          "nerdycap.eth": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
