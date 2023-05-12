
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  dependsOn: ["proof-of-humanity","babt-holders-bsc",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const proofOfHumanityGroupLatest = await groupStore.latest(
      "proof-of-humanity"
    );
    
    const proofOfHumanityData0 = dataOperators.Map(
      await proofOfHumanityGroupLatest.data(),
      1
    );
    
    const babtHoldersBscGroupLatest = await groupStore.latest(
      "babt-holders-bsc"
    );
    
    const babtHoldersBscData1 = dataOperators.Map(
      await babtHoldersBscGroupLatest.data(),
      1
    );
    
    const jsonListData2 = {
      "deepcryptodive.eth": "1",
    };
    
    const dataUnion = dataOperators.Union([
      proofOfHumanityData0,
      babtHoldersBscData1,
      jsonListData2 
    ]);

    return [
      {
        name: "verified-humans",
        timestamp: context.timestamp,
        description: "Data Group of users that have verified their identity on PoH or Binance",
        specs: "Verified identity via Proof of Humanity - Hold a Binance Account Bound Token. Updated weekly",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
