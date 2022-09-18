import { dataProviders } from "@group-generators/helpers/providers";
import { ValueType, Tags, FetchedData, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// This group is constituted by all addresses that follows circularmerch.lens
// the value is 1
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.getFollowers("0x9CE1")) {
      dataProfiles[item.wallet.address] = 1;
    }

    return [
      {
        name: "circularmerch-lens-followers",
        timestamp: context.timestamp,
        data: dataProfiles,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
