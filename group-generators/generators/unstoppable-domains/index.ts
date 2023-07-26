import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";

import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const tokenProvider = new dataProviders.TokenProvider();
    const domainRegistryContracts = [
      "0x049aba7510f45BA5b64ea9E658E342F904DB358D",
      "0x070e83FCed225184E67c86302493ffFCDB953f71",
      "0xa9a6A3626993D487d2Dbda3173cf58cA1a9D9e9f",
      "0x107733feD96C4Cd390c944a31F5425A7FB98Ae5e",
      "0x2a93C52E7B6E7054870758e15A1446E769EdfB93",
    ];

    const mainnetHolders: FetchedData[] = [];

    for (const contractAddress of domainRegistryContracts) {
      const holders = await tokenProvider.getERC721Holders({
        contractAddress,
      });
      mainnetHolders.push(holders);
    }

    const polygonHolders: FetchedData[] = [];

    for (const contractAddress of domainRegistryContracts) {
      const holders = await tokenProvider.getERC721Holders({
        contractAddress,
        network: "polygon",
      });
      polygonHolders.push(holders);
    }

    const dataUnion = dataOperators.Union([...mainnetHolders, ...polygonHolders]);

    return [
      {
        name: "unstoppable-domains",
        displayName: "Unstoppable Domains Owners",
        timestamp: context.timestamp,
        description: "hold an unstoppable-domains domain",
        specs: "This badge is for holders of an unstoppable-domains domain.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.NFT],
      },
    ];
  },
};

export default generator;
