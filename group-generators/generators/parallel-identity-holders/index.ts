import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const alchemyProvider = new dataProviders.AlchemyProvider();

    const simpleCollectionParams = {
      chain: "eth-mainnet",
      contractAddress: "0x9ec6232742b6068ce733645af16ba277fa412b0a",
    };

    const holders = await alchemyProvider.getOwnersForCollection(
      simpleCollectionParams
    );

    return [
      {
        name: "parallel-identity-holders",
        timestamp: context.timestamp,
        description: "get parallel identity holders",
        specs: "get parallel identity holders ",
        data: holders,
        valueType: ValueType.Score,
        tags: [Tags.Factory, Tags.Maintained],
      },
    ];
  },
};
export default generator;