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
        name: "aurora",
        timestamp: context.timestamp,
        description: "early participater",
        specs: "test",
        data: {
          "0xB65016EA5E4eC221Ea7FA2379868277171a23cD9": "1",
          "github:auroraug": "1",
        },
        accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
