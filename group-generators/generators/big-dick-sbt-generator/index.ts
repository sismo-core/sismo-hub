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
        name: "big-dick-sbt-generator",
        timestamp: context.timestamp,
        data: {
          "0xD6379059Be536E39951217A25D569658F925C8d1": "1",
          "0x0a896a493719b545b663eEE755a5288a2409ACC5": "1",
          "0x7A224fE205ddC90462B86B2338e33Aeb8203Ed6D": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
