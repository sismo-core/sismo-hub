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
        name: "therealafrorickgroup",
        timestamp: context.timestamp,
        description: "Be a part of the AfroRick fan club, follow AfroRick on Twitter, purchase AfroRick NFTs",
        specs: "",
        data: {
          "0x7D9a78f607706b8F5cE26Fba6c9EaCabF8937df0": "1",
          "0x0C402267b8fBa9aeE20B194d5d95E88a63955129": "1",
          "0x05Aad856fE4A5Ff9DbF3259e3f2d17D5102f9037": "1",
          "0x42F0a6a284E4bE8b203562F76eD61161369F39F2": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
