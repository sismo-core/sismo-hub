import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const jsonListData0 = {
      "github:YasuBlockchain": "1",
      "github:0xheartcode": "1",
    };

    return [
      {
        name: "potato-nft-minters",
        timestamp: context.timestamp,
        description: 'Data group of minters of the "potato" NFT',
        specs: "A very useful description",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
