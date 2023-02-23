// import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  FetchedData,
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
    const lensProvider = new dataProviders.LensProvider();
    // const farcasterProvider = new dataProviders.FarcasterProvider();

    const lensProfiles: FetchedData = await lensProvider.getProfiles();
    // const farcasterProfiles: FetchedData = await farcasterProvider.getAllUsers();

    // const web3SocialProfiles = dataOperators.Union([ 
    //     lensProfiles,
    //     farcasterProfiles 
    // ]);

    return [
      {
        name: "web3-social",
        timestamp: context.timestamp,
        data: lensProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
