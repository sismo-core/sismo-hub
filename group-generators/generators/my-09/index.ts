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
        name: "my-09",
        timestamp: context.timestamp,
        description: "hold",
        specs: "0xD8696bBD8ce60804F0fC9FdbB73B517E72855F2c",
        data: {
          "0xD8696bBD8ce60804F0fC9FdbB73B517E72855F2c": "1",
          "github:katsumotoeth": "1",
        },
        accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
