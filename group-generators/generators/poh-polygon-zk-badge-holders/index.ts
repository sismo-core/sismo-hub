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
    const getPoHZkBadgeHolders = await bigQueryProvider.getSismoZkBadges({
      contractAddress: contractAddress,
      zkBadgeId: "10000009",
    });

    const data: FetchedData = {};
    for (const event of getPoHZkBadgeHolders) {
      data[event.to] = 1;
    }

    return [
      {
        name: "poh-polygon-zk-badge-holders",
        timestamp: context.timestamp,
        description: "Holders of the PoH ZK Badge on Polygon",
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
