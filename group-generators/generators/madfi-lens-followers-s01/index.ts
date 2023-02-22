import bots from "./bots.json";
import madfiFrens from "./frens.json";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const MADFI_PROFILE_ID = "0x21c0"; // madfinance.lens

    const lensProvider = new dataProviders.LensProvider();

    const profiles = await lensProvider.getFollowers({
      profileId: MADFI_PROFILE_ID,
    });

    // dorg.tech, raidguild, and other frens
    madfiFrens.forEach(address => (profiles[address] = 1));

    // no tx beyond our follow
    bots.forEach(address => delete profiles[address]);

    return [
      {
        name: "madfi-lens-followers-s01",
        timestamp: context.timestamp,
        description: "Early followers of @madfinance.lens + whitelisted MadFi frens",
        specs: "",
        data: profiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
