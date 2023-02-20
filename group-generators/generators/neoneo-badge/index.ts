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
        name: "neoneo-badge",
        timestamp: context.timestamp,
        description: "Hold a #MetaPunk with Gold Chain #NFT ",
        specs: "Hold a #MetaPunk NFT ",
        data: {
          "0x14DB68E0B434E1ae7572c087F87086Ad07151652": "1",
          "0x3C4A7f9226F964cAD2A0864B7d3f6f14e711B121": "1",
          "0x7AEB9cA464683547a7753Ac3F8Da12Ede8Da1f05": "1",
          "0x25c60ddF804bC29e93eaeb15Aa81c95aC7fD310f": "1",
          "0xB69Ed84089d0603119c72CE40bbFb613b697f86e": "1",
          "0x5d62E2AE65BFD8826a7A2080071d3e1DA6126306": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
