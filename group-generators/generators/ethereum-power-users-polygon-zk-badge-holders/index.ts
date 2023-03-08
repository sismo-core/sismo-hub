import BigQueryProvider, {
  SupportedNetwork,
} from "@group-generators/data-providers/big-query/big-query";
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
    const getEthereumPowerUsersZkBadgeHolders =
      await bigQueryProvider.getSismoZkBadges({
        contractAddress: contractAddress,
        zkBadgeId: "10000005",
      });

    const data: FetchedData = {};
    for (const event of getEthereumPowerUsersZkBadgeHolders) {
      data[event.to] = 1;
    }

    return [
      {
        name: "ethereum-power-users-polygon-zk-badge-holders",
        timestamp: context.timestamp,
        description: "Holders of the Ethereum Power User ZK Badge on Polygon",
        specs: "",
        data: data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
