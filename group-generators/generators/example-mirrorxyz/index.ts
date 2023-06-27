import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  // Contracts for testing (just open Mirrorxyz and search the browser developer console, network tab for "proxyAddress":" for the contract address)
  // Sydicate "Phase 2: Investing is a Financial and Social Network" https://optimistic.etherscan.io/token/0x099aeec83768c5a3eb3ffa30aca4d9a31a1c230c
  // Zikings Bulletin 1 contract: https://optimistic.etherscan.io/token/0x7c544a77d6afd13c73588f3321c8c04f58a5c8b0
  // Bankless DAO Crypto Basics Series: Towards better token distribution: https://optimistic.etherscan.io/address/0x01d4dbbcba2371ede946df1a3290f4785fc4b83e
  // Ep 05 - Reo Cragun 10/100: https://optimistic.etherscan.io/address/0xf8908be9179a9908b608b002425893663f34e27b
  // Crypto Basics Series: Crypto Wallets 101: https://optimistic.etherscan.io/address/0x87d524Bd7d6d76B5ED16b6b74847FB40617C1FF1 

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const mirrorXyzProvider = new dataProviders.MirrorXyzSubgraphProvider();
    const input = {
      contract: "0x87d524Bd7d6d76B5ED16b6b74847FB40617C1FF1",
    };

    const mirrorXyzData = await mirrorXyzProvider.getPostCollectors(input);
    return [
      {
        name: "example-mirrorxyz",
        timestamp: context.timestamp,
        description: "get all post collectors for a given contract",
        specs: "",
        data: mirrorXyzData,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};
export default generator;
