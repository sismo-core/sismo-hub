
import { dataProviders } from "@group-generators/helpers/data-providers";
import { SupportedNetwork } from "@group-generators/helpers/data-providers/big-query";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    // const bqProvider = new dataProviders.BigQueryProvider({network: SupportedNetwork.POLYGON});

    // const holders = await bqProvider.getERC1155Ownership({
    //   contractAddress: "0x71a7089C56DFf528f330Bc0116C0917cd05B51Fc",
    //   tokenId: "30000001",
    // });

    // const tokenProvider = new dataProviders.TokenProvider();
    
    // const holders = await tokenProvider.getERC721Holders({
    //   contractAddress: "0x8b4616926705Fb61E9C4eeAc07cd946a5D4b0760",
    //   network: SupportedNetwork.MAINNET,
    // });

    // sBTC: 0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6
    
    const tokenProvider = new dataProviders.TokenProvider();
    
    // const holders = await tokenProvider.getERC20Holders({
    //   contractAddress: "0x4104b135DBC9609Fc1A9490E61369036497660c8",
    //   network: SupportedNetwork.MAINNET,
    //   // minAmount: 10000,
    //   // tokenDecimals: 18,
    //   // forcedValue: 1,
    //   // snapshot: "2021-10-19",
    // });

    // const holders = await tokenProvider.getERC721Holders({
    //   contractAddress: "0x31c6e456832052dbc337e2ac19c41ff37f9903a0",
    //   network: SupportedNetwork.MAINNET,
    //   // minAmount: 10,
    //   // forcedValue: 10,
    //   // snapshot: "2023-05-30",
    // });


    // const holders = await tokenProvider.getERC1155Holders({
    //   contractAddress: "0xe77eb6fb5037bCb11db10b9Ae478A7D01354Ae01",
    //   tokenId: "10000040",
    //   network: SupportedNetwork.MAINNET,
    //   minAmount: 2,
    //   forcedValue: 10,
    //   snapshot: "2023-05-20",
    // });
    
    // const holders = await tokenProvider.getERC1155Holders({
    //   contractAddress: "0xdd4f84e4f3cd31d6c91d80122b5a26cb4ae66bd5",
    //   // tokenId: "2",
    //   network: SupportedNetwork.MAINNET,
    //   // minAmount: 3,
    //   // forcedValue: 10,
    //   // snapshot: "2023-05-30",
    // });

    // const count = await tokenProvider.getERC1155HoldersCount({
    //   contractAddress: "0xdd4f84e4f3cd31d6c91d80122b5a26cb4ae66bd5",
    //   // tokenId: "2",
    //   network: SupportedNetwork.MAINNET,
    // });
    
    // console.log("count", count);

    // const holders = await tokenProvider.getERC20Holders({
    //   contractAddress: "0xAB846Fb6C81370327e784Ae7CbB6d6a6af6Ff4BF",
    //   network: SupportedNetwork.MAINNET,
    // });

    const count = await tokenProvider.getERC20HoldersCount({
      contractAddress: "0x3F382DbD960E3a9bbCeaE22651E88158d2791550",
      network: SupportedNetwork.MAINNET,
    });
    
    console.log("count", count);

    // const holders = await tokenProvider.getERC721Holders({
    //   contractAddress: "0xbcd4F1EcFf4318e7A0c791C7728f3830Db506C71",
    //   network: SupportedNetwork.MAINNET,
    // });

    // const count = await tokenProvider.getERC721HoldersCount({
    //   contractAddress: "0xbcd4F1EcFf4318e7A0c791C7728f3830Db506C71",
    //   network: SupportedNetwork.MAINNET,
    // });
    
    // console.log("count", count);

    // const holders = await tokenProvider.getERC1155Holders({
    //   contractAddress: "0xa42Bd534270dD4C934D970429392Ce335c79220D",
    //   tokenId: "84607",
    //   network: SupportedNetwork.MAINNET,
    //   // minAmount: 10,
    //   // forcedValue: 10,
    //   // snapshot: "2023-05-30",
    // });

    return [
      {
        name: "0xlegion-lens-follower",
        timestamp: context.timestamp,
        description: "Snapshot everyday. if you've just followed 0xlegion.lens, please wait 48 hours.",
        specs: "",
        data: holders,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
