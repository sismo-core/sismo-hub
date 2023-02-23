
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
  dependsOn: ["singularity-dao","mathcastles"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const singularityDaoGroupLatest = await groupStore.latest(
      "singularity-dao"
    );
    
    const singularityDaoData0 = dataOperators.Map(
      await singularityDaoGroupLatest.data(),
      1
    );
    
    const mathcastlesGroupLatest = await groupStore.latest(
      "mathcastles"
    );
    
    const mathcastlesData1 = dataOperators.Map(
      await mathcastlesGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      singularityDaoData0,
      mathcastlesData1 
    ]);

    return [
      {
        name: "isaac-essuman",
        timestamp: context.timestamp,
        description: "Hold early ZK badges",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
