
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
  dependsOn: ["singularity-dao",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const singularityDaoGroupLatest = await groupStore.latest(
      "singularity-dao"
    );
    
    const singularityDaoData0 = dataOperators.Map(
      await singularityDaoGroupLatest.data(),
      1
    );
    
    const jsonListData1 = {
      "0x7b52d7bf88b20bf0b0ce38a0370ecb80fd16bb6e": "1",
      "0xa3b6561b9a378d06a2c0ff0ba03e0ff9790a2cfd": "1",
      "0x49407d74c2f07556abfe3943e22cc081d06468d3": "1",
      "0xde223835a8b9036d4520cbc138d42e0af7a82f0a": "1",
      "0xe7185284c4f9aede126f45645874f406244e22d4": "1",
      "0xf885bfa68f4e1d9b9034c45fdbd7de5849ead338": "1",
      "0x2133de485dc702d6483b0d3376a275ba521891dd": "1",
      "0x1af7c40409c7b182e2072051e82e13c0f98edca9": "1",
      "0x7f191d301c45d63caf1159c03879dfe6438bd356": "1",
      "0x96f6fc853c111f6b7afb5c8799fac93ee2c50a1e": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      singularityDaoData0,
      jsonListData1 
    ]);

    return [
      {
        name: "always-early",
        timestamp: context.timestamp,
        description: "Be a part of singularity DAO, or be on a chat whitelist",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
