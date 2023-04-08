import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const mirrorXyzProvider = new dataProviders.MirrorXyzSubgraphProvider();
    const input = {
      contract: "0x099aeec83768c5a3eb3ffa30aca4d9a31a1c230c",
    };

    const mirrorXyzData = await mirrorXyzProvider.getPostCollectors(input);
    return [
      {
        name: "sp-mirrorxyz",
        timestamp: context.timestamp,
        description: "get all post collectors for a given contract",
        specs: "",
        data: mirrorXyzData,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};
export default generator;
