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
        name: "ambire-frens",
        timestamp: context.timestamp,
        description: "Hold an Ambire Wallet and $Wallet Token",
        specs: "",
        data: {
          "twitter:robertcedwards": "1",
          "github:robertcedwards": "1",
          "0xhashbrown.lens": "1",
          "0xhashbrown.eth": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
