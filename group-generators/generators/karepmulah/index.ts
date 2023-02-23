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
        name: "karepmulah",
        timestamp: context.timestamp,
        description: "penting ora poso",
        specs: "yo ",
        data: {
          "0x1007D24Fce29DAD61c5e892ecAFd8De2612AA180": "1",
          "0x569559bc60FcE92E076f8567DFec2b8EF1015e8a": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
