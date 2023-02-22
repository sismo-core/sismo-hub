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
        name: "monsters",
        timestamp: context.timestamp,
        description: "For holders of MonsterWear NFT on halloween night!",
        specs: "For monsters",
        data: {
          "0x32c8B588Bb1d64E9903443770BA5c3630daE8d7a": "1",
          "0x7CE58d086f00448bcb23269670da8242279F762c": "1",
          "0x40557A4cB808d58910B3F1Fad23a490C57754F03": "1",
          "0x94F9db2e94Afe3037ff8A921154c71Eaa6d7D798": "1",
          "0xC8Da16324005418DAD0b72E3C98A67707ce5eC34": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
