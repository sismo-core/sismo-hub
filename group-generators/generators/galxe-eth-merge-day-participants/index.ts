import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const galxeProvider = new dataProviders.GalxeProvider();
    const input = {
      id: "GCyruUtEW4",
    };

    const galxeData = await galxeProvider.getCampaignHolders(input);
    return [
      {
        name: "galxe-eth-merge-day-participants",
        timestamp: context.timestamp,
        description: 'Data Group of all "ETH Merge Day!" campaign participants',
        specs:
          'Created by the Galxe Data Provider. Contains all the holders of the "ETH Merge Day!" campaign(GCyruUtEW4). Value of each group member is the tokenID of the NFT they received from the campaign.',
        data: galxeData,
        valueType: ValueType.Score,
        tags: [Tags.Maintained],
      },
    ];
  },
};
export default generator;
