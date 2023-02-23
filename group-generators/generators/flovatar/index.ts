
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
  dependsOn: ["cryptomonkeys","gen-0-dagorians","zklend-poap-contributor"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const cryptomonkeysGroupLatest = await groupStore.latest(
      "cryptomonkeys"
    );
    
    const cryptomonkeysData0 = dataOperators.Map(
      await cryptomonkeysGroupLatest.data(),
      1
    );
    
    const gen0DagoriansGroupLatest = await groupStore.latest(
      "gen-0-dagorians"
    );
    
    const gen0DagoriansData1 = dataOperators.Map(
      await gen0DagoriansGroupLatest.data(),
      1
    );
    
    const zklendPoapContributorGroupLatest = await groupStore.latest(
      "zklend-poap-contributor"
    );
    
    const zklendPoapContributorData2 = dataOperators.Map(
      await zklendPoapContributorGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      cryptomonkeysData0,
      gen0DagoriansData1,
      zklendPoapContributorData2 
    ]);

    return [
      {
        name: "flovatar",
        timestamp: context.timestamp,
        description: "Early ZK Badge",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
