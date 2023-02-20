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
        name: "martian-wave",
        timestamp: context.timestamp,
        description: "Do all kinds of stuff, also do other stuff.",
        specs: "Not sure at all what this is for, TBH.",
        data: {
          "0x2341b8A9F4347d966b022F3050ef82d84DAa5F7F": "1",
          "0x4A3e7a898922788274fAA76a138A9ada590a91b5": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
