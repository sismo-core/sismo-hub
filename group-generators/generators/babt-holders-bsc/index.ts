import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const bscTokenProvider = new dataProviders.BscTokenProvider();
    const addresses = await bscTokenProvider.getNftHolders({
      address: "0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8",
    });
    return [
      {
        name: "babt-holders-bsc",
        description: "Get all holders of Binance Account Bound Token $BABT.",
        specs: "",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
