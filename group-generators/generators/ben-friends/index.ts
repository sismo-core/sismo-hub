
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  FetchedData,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Here you are hacker 😈

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once, // you generate the group only once
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const restProvider = new dataProviders.RestProvider();

    const response = await restProvider.fetchData({
      url: "https://www.anoufa.dev/api/friendList",
      method: "get",
    });

    const dataProfiles: FetchedData = {};
    for (const item of response.data){
      {dataProfiles[item.friendAddress] = "1" }
    }

    return [
      {
        name: "ben-friends", // give a name to your group
        timestamp: context.timestamp,
        description: "Be Benjamin's Friend",
        specs: "You should have previously registered as a friend by calling the becomeFriend function on the Goerli tesnet smart contract called BenFriend at 0x008C13e7D240447f38DD96f80e9E08fA53bbE318.",
        // two different data formats in the group
        // ethereum account -> "0x95af97aBadA3b4ba443ff345437A5491eF332bC5": "1", 
        // github account ->   "github:mylogin": "1"
        data: dataProfiles, // we reference the final data we created
        // we reference the different sources of our data
        // ethereum accounts and github accounts
        accountSources: [AccountSource.ETHEREUM], 
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;