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
        name: "kung-fu",
        timestamp: context.timestamp,
        description: "BTC/ETH/NFT/WEB3",
        specs: "",
        data: {
          "32145.eth": "1",
          "dragonlv.lens": "1",
          "twitter:dragonlv6": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
