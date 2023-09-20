import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const ankrProvider = new dataProviders.AnkrProvider();
    const addresses = await ankrProvider.getNftHolders({
      network: "bsc",
      address: "0x2B09d47D550061f995A3b5C6F0Fd58005215D7c8",
    });
    return [
      {
        name: "babt-holders-bsc",
        displayName: "BABT NFT Holders",
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
