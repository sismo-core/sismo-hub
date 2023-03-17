import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const alchemyProvider = new dataProviders.AlchemyProvider();

    const alchemyData = await alchemyProvider.queryCollectionOwners({
      contractAddress: "0xe785E82358879F061BC3dcAC6f0444462D4b5330",
    });

    return [
      {
        name: "test-alchemy-collection",
        timestamp: context.timestamp,
        description: "Checking if alchemy collection function does work.",
        specs: "test.",
        data: alchemyData,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
