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
        name: "rocketlab",
        timestamp: context.timestamp,
        description: "part of 🚀rocketlab.eth",
        specs: "contributor to 🚀rocketlab.eth minipools",
        data: {
          "0x861C02906c1a57dbaD3243c76cd124Cd3789b282": "1",
          "0xE9dd7C08c47C5ba09dA5DAaAeDCd5B181a8E7C27": "1",
          "0x8AA389F44C3F6ddA38557D0B74B5e7d87900c43b": "1",
          "0x707bC3783Bc3c775d05AB94DCab00A3560595cF5": "1",
          "0x4630C57245C86B79286D1b24a40F2793024c80E5": "1",
          "0x0Dc4430401165a5e79dc494643915F0c31fdfF36": "1",
          "0x97a79cB51784d836de518e995001425c7374D136": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
