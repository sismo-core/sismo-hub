import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// This group is constituted by users who have contributed in this project
// You can add your address in any Pull Request

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "sismo-contributors",
        timestamp: context.timestamp,
        data: {
          "0xFD13e511F8C734cC3e82605512eF722080EFeaad": 1,
        },
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
