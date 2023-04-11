import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  //Kleoverse ERC1155 is on Polygon contract: https://polygonscan.com/token/0x9c92849c0a882872b21a73693b2e37b463cec201
  //tokenId 0 is the GitHub badge
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();

    const input = {
      contractAddress: "0x9c92849c0a882872b21a73693b2e37b463cec201",
      tokenId: "0",
      network: "polygon",
    };

    const addresses = await tokenProvider.getERC1155Holders(input);

    return [
      {
        name: "example-kleoverse",
        description: "Get all Kleoverse GitHub badge holders",
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
