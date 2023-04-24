import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

//Humanbound contract addresses
//ETH: https://etherscan.io/address/0x594E5550ecE2c10e5d580e538871914F55884f5d
//POLYGON: https://polygonscan.com/address/0x41Be3A6C17cf76442d9E7B150de4870027D36f52
//ABRITRUM: https://arbiscan.io/address/0x5beB956A9Af054956c5C6c0aFac7b109236f86Aa
//OPTIMISIM: https://optimistic.etherscan.io/address/0xFF439bA52825Ffd65E39Fd2bF519566d0cd91827
const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const ankrProvider = new dataProviders.AnkrProvider();

    const mainnetHumanboundHolders = await ankrProvider.getNftHolders({
      network: "eth",
      address: "0x594E5550ecE2c10e5d580e538871914F55884f5d",
    });

    const polygonHumanboundHolders = await ankrProvider.getNftHolders({
      network: "polygon",
      address: "0x41Be3A6C17cf76442d9E7B150de4870027D36f52",
    });

    const arbitrumHumanboundHolders = await ankrProvider.getNftHolders({
      network: "arbitrum",
      address: "0x5beB956A9Af054956c5C6c0aFac7b109236f86Aa",
    });

    const optimsismHumanboundHolders = await ankrProvider.getNftHolders({
      network: "optimism",
      address: "0xFF439bA52825Ffd65E39Fd2bF519566d0cd91827",
    });

    const humanBoundBadgeHolders = dataOperators.Union([
      mainnetHumanboundHolders,
      polygonHumanboundHolders,
      arbitrumHumanboundHolders,
      optimsismHumanboundHolders,
    ]);

    return [
      {
        name: "example-humanbound",
        description: "Get all humanbound holders",
        specs: "",
        timestamp: context.timestamp,
        data: humanBoundBadgeHolders,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
