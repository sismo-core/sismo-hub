import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const jsonListData0 = {
      "0x60d3130a2F3f8C04ee54D3cF3863e7aDd8ebA322": "1",
      "0xC96DEdb0F0972b90715FD58c75012Ca995Cb3F8E": "1",
      "alanred.eth": "1",
      "0x34Be04572d39BC8f897e0156722898109c84F105": "1",
      "cmadison.eth": "1",
    };

    return [
      {
        name: "lazybaer",
        timestamp: context.timestamp,
        description: "be a lazybaer fren",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
