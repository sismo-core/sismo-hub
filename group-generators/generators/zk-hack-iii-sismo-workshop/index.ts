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
        name: "zk-hack-iii-sismo-workshop",
        timestamp: context.timestamp,
        data: {
          "0xF61CabBa1e6FC166A66bcA0fcaa83762EdB6D4Bd": "1",
          "leo21.eth": "1",
          "github:leosayous21": "1",
          "twitter:LeopoldSayous": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
