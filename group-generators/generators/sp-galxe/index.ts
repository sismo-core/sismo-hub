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
    const galxeProvider = new dataProviders.GalxeProvider();
    const input = {
      id: "GCto8UUcU9",
    };

    const galxeData = await galxeProvider.getCampaignHolders(input);
    console.log(galxeData);
    return [
      {
        name: "sp-galxe",
        timestamp: context.timestamp,
        description: "get campaign holders from galxe campaign GCto8UUcU9",
        specs: "campaign GCto8UUcU9",
        data: galxeData,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;
