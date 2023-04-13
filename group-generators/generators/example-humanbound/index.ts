import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  //Humanbound badges are deployed crosschain, same tokenId as ETH  https://etherscan.io/address/0x594E5550ecE2c10e5d580e538871914F55884f5d
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();

    const mainnetHumanboundHolders = await tokenProvider.getNftHolders({
      contractAddress: "0x594E5550ecE2c10e5d580e538871914F55884f5d",
      network: "mainnet",
    });

    const polygonHumanboundHolders = await tokenProvider.getNftHolders({
      contractAddress: "0x594E5550ecE2c10e5d580e538871914F55884f5d",
      network: "polygon",
    });

    const humanBoundBadgeHolders = dataOperators.Union([
      mainnetHumanboundHolders,
      polygonHumanboundHolders,
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
