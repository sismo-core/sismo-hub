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
        name: "moon",
        timestamp: context.timestamp,
        data: {
          "0xf997558AE6aB4e5b7DF35B6686becf512A50202c": "1",
          "0x5afa09aD4cDB278dbae2fc3B16d29b37F86F8A89": "1",
          "0x5BCA89df42079F710C2D2b52f23C0D29a2e63012": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
