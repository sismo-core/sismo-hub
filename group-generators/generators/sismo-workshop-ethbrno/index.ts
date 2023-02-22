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
        name: "sismo-workshop-ethbrno",
        timestamp: context.timestamp,
        description: "Attend Sismo Workshop @ ETHBrno",
        specs: "",
        data: {
          "twitter:big_q__": "1",
          "github:yum0e": "1",
          "bigq11.eth": "1",
          "bigq_.lens": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
