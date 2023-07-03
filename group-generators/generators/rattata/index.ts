
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["we-are-ratatas",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const weAreRatatasGroupLatest = await groupStore.latest(
      "we-are-ratatas"
    );
    
    const weAreRatatasData0 = dataOperators.Map(
      await weAreRatatasGroupLatest.data(),
      1
    );
    
    const jsonListData1 = {
      "0x8E7eFD5d78b0d89cF47db2F0FDEFa64De2F9a399": "1",
    };
    
    const jsonListData2 = {
      "0x8E7eFD5d78b0d89cF47db2F0FDEFa64De2F9a399": "1",
      "github:YasuBlockchain": "1",
      "github:0xheartcode": "1",
      "twitter:0xheartcode": "1",
      "twitter:YasuBlockchain": "1",
    };
    
    const dataUnion = dataOperators.Union([
      weAreRatatasData0,
      jsonListData1,
      jsonListData2 
    ]);

    return [
      {
        name: "rattata",
        timestamp: context.timestamp,
        description: "Be part of the Rattata community",
        specs: "Best Rattata badge ever",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
