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
        name: "twitter-account-test",
        timestamp: context.timestamp,
        data: {
          "0xF61CabBa1e6FC166A66bcA0fcaa83762EdB6D4Bd": "1",
          "twitter:LeopoldSayous": "1",
          "github:leosayous21": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
