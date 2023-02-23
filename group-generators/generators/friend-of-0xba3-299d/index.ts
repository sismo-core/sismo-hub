
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["sismo-contributors",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData0 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );
    
    const jsonListData1 = {
      "0xc713ad7305ec2eb9d8d7654190ac359293a22968": "1",
      "0x002ee33092457900515a4249e3ec1cd2b2dc8c32": "1",
      "0xa9afcef744fc60baf5a1325d4071dd5e9ba4a5c9": "1",
      "0x9628f11c8fbf15df1307ad5284398ad7dcdf573c": "1",
      "0x174512f95cb6a9c602753536554490d50260fb80": "1",
      "0x47b982b6fbd7cd7f6ec19a2f2dad47e38097c3f0": "1",
      "0xc6c3e4bbcdc719e7b5793a31a36937f729605c33": "1",
      "0x69155e7ca2e688ccdc247f6c4ddf374b3ae77bd6": "1",
      "0x8836571d0ba76b888702630a6a0a577e3f65d036": "1",
      "0x16a472f0f29ffb72348f7ce6e56e7c9acbd0bba3": "1",
      "0x8fd4f55a3a3f8f3cf461bd4a6a3ffee937fbf75c": "1",
      "0xa6da1dedffd8681a227d21ed9893246caebaf4ab": "1",
      "0xde2f77277cc4d8b85ecbbed0f5acc27dfe6a255a": "1",
      "0x381a034325dcf0687888815461f26f5f8c559e13": "1",
      "0x991333c1644254e42f7aae84079ee70740674c62": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      sismoContributorsData0,
      jsonListData1 
    ]);

    return [
      {
        name: "friend-of-0xba3-299d",
        timestamp: context.timestamp,
        description: "Following 0xbA3...299d DeBank.",
        specs: "Follow 0xbA3bD68Ce6B33bB2E097aCE5e82E63C53021299d on Debank.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
