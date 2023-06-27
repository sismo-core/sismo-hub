
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
  dependsOn: ["phratry","martingbz-sismo-thread-1-lens-mirrorers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const phratryGroupLatest = await groupStore.latest(
      "phratry"
    );
    
    const phratryData0 = dataOperators.Map(
      await phratryGroupLatest.data(),
      1
    );
    
    const martingbzSismoThread1LensMirrorersGroupLatest = await groupStore.latest(
      "martingbz-sismo-thread-1-lens-mirrorers"
    );
    
    const martingbzSismoThread1LensMirrorersData1 = dataOperators.Map(
      await martingbzSismoThread1LensMirrorersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([
      phratryData0,
      martingbzSismoThread1LensMirrorersData1 
    ]);

    return [
      {
        name: "dookies-group-1",
        timestamp: context.timestamp,
        description: "trying things",
        specs: "trying technicalities",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
