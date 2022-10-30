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
        name: "my-bage",
        timestamp: context.timestamp,
        data: {
          "0x2097D9aaFBc1f9B542317f2CccE176DD675Fd4F9": "1",
          "0x1B01695d7238628960d5871e50Db139d21BAEc52": "1",
          "0xef8db5eb83727056749929132FD03ec292DB9Dfc": "1",
          "0x1501e68080F0842a16F7bAd1C52e2433978b83D7": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
