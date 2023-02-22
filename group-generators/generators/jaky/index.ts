
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
  dependsOn: ["gen-0-dagorians"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const gen0DagoriansGroupLatest = await groupStore.latest(
      "gen-0-dagorians"
    );
    
    const gen0DagoriansData0 = dataOperators.Map(
      await gen0DagoriansGroupLatest.data(),
      1
    );

    return [
      {
        name: "jaky",
        timestamp: context.timestamp,
        description: "ens",
        specs: "jouy",
        data: gen0DagoriansData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
