import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  GroupWithData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const farcasterProvider = new dataProviders.FarcasterProvider();
    const lensProvider = new dataProviders.LensProvider();

    const [farcasterProfiles, lensProfiles] = await Promise.all([
      farcasterProvider.getAllUsers(),
      lensProvider.getAllProfiles(),
    ]);

    const web3SocialProfiles = dataOperators.Union([ 
        lensProfiles,
        farcasterProfiles 
    ]);

    return [
      {
        name: "web3-social",
        timestamp: context.timestamp,
        description: "ZK Badge owned by all web3 social users",
        specs: "Have a profile on Lens or Farcaster",
        data: web3SocialProfiles,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
