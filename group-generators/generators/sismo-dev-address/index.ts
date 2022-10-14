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
        name: "sismo-dev-address",
        timestamp: context.timestamp,
        data: {
          "0xb01ee322C4f028B8A6BFcD2a5d48107dc5bC99EC": "1",
          "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": "1",
          "0x411C16b4688093C81db91e192aeB5945dCA6B785": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
