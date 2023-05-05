
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";
import { QueryParams } from "@group-generators/helpers/data-providers/dune/types";

const generator: GroupGenerator = {

  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const duneProvider = new dataProviders.DuneProvider();

    const duneProviderData30Swaps = await duneProvider.executeQuery({
      queryId: 2443489,
      queryParamsObject: {
        "min_swaps": "30"
      },
      duneEthAddressColumn: "address"
    });

    const duneProviderData50Swaps = await duneProvider.executeQuery({
      queryId: 2443489,
      queryParamsObject: {
        "min_swaps": "50"
      },
      duneEthAddressColumn: "address"
    });

    return [
      {
        name: "philand-quest-uniswap-v3-30-swaps",
        timestamp: context.timestamp,
        description: "Made at least 30 swaps on Uniswap V3 Ethereum",
        specs: "",
        data: duneProviderData30Swaps,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet],
      },
      {
        name: "philand-quest-uniswap-v3-50-swaps",
        timestamp: context.timestamp,
        description: "Made at least 50 swaps on Uniswap V3 Ethereum",
        specs: "",
        data: duneProviderData50Swaps,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet],
      },
    ];
  },
};

export default generator;