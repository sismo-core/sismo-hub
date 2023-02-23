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
        name: "tpair",
        timestamp: context.timestamp,
        description: "be part of TpAir Community ",
        specs: "be a member of the core team TpAir ",
        data: {
          "0x03E8eB94cff6B8985b5D1F25f9dfC149e4f71BF5": "1",
          "0x480c9e50EeaC75700d1F65b8969Cb2FDA6EC5daf": "1",
          "0xec2b0cD906c16B91C3CfF904653d461f71E6E09c": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
