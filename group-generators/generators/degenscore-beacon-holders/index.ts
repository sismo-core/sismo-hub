import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();
    const holders = await tokenProvider.getERC1155Holders({
      contractAddress: "0x0521FA0bf785AE9759C7cB3CBE7512EbF20Fbdaa",
      network: "mainnet",
    });

    return [
      {
        name: "degenscore-beacon-holders",
        timestamp: context.timestamp,
        description: "Data Group of DegenScore Beacon Holders",
        specs:
          "Created by the Token Data Provider. Contains all addresses that own a DegenScore Beacon (https://degenscore.com/beacon). Value of each group member is the Degen Score of the Beacon.",
        data: holders,
        valueType: ValueType.Score,
        tags: [Tags.Maintained],
      },
    ];
  },
};

export default generator;
