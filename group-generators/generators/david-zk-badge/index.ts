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
        name: "david-zk-badge",
        timestamp: context.timestamp,
        description: "HOLD A .SISMO.ETH ENS",
        specs: "",
        data: {
          "0x546ce0389fEe3cC6AA68F744e06631c8E563e167": "1",
          "0x2700f426f2633d1100561cfce41acf08a582e637": "1",
          "0x603A641BBaF1ec5aa9dda464295a4c8d0963BA6d": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
