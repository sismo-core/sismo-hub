import BigQueryProvider, {
  SupportedNetwork,
} from "@group-generators/helpers/data-providers/big-query/big-query";
import {
  Tags,
  ValueType,
  GroupWithData,
  FetchedData,
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
    const bigQueryProvider = new BigQueryProvider({
      network: SupportedNetwork.POLYGON,
    });

    // Badges contract address on Polygon
    const contractAddress = "0xF12494e3545D49616D9dFb78E5907E9078618a34";
    const getEarlyUsersBadgeHolders = await bigQueryProvider.getSismoZkBadges({
      contractAddress: contractAddress,
      zkBadgeId: "0",
    });

    const dataEarlyUsers: FetchedData = {};
    for (const event of getEarlyUsersBadgeHolders) {
      dataEarlyUsers[event.to] = 1;
    }

    return [
      {
        name: "sismo-early-users",
        timestamp: context.timestamp,
        description: "Mint a Sismo Badge before 15th of September 2022",
        specs: "",
        data: dataEarlyUsers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
