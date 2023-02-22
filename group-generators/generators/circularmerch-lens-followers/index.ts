import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  GroupWithData,
  AccountSource,
} from "topics/group";
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

    const dataProfiles = await lensProvider.getFollowers({
      profileId: "0x9CE1",
    });

    return [
      {
        name: "circularmerch-lens-followers",
        timestamp: context.timestamp,
        description: "Be a follower of circularmerch.lens on Lens",
        specs: "",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
