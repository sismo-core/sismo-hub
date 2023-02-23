import { Tags, ValueType, GroupWithData } from "topics/group";
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
        name: "mintanklee",
        timestamp: context.timestamp,
        description: "be part of mintank",
        specs: "Contributor",
        data: {
          "0x600D1bF9aD00514196Ed9a96c5AfBDDb471478C9": "1",
          "0xc60b220F62578DF2e584349dFb3A771780a300Ed": "1",
          "0x8D1D836F06D271028D028B4fB7BA4386795B9D0d": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
