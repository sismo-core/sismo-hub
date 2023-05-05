
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
  dependsOn: ["martingbz-sismo-thread-1-lens-mirrorers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const martingbzSismoThread1LensMirrorersGroupLatest = await groupStore.latest(
      "martingbz-sismo-thread-1-lens-mirrorers"
    );
    
    const martingbzSismoThread1LensMirrorersData0 = dataOperators.Map(
      await martingbzSismoThread1LensMirrorersGroupLatest.data(),
      1
    );

    return [
      {
        name: "peter",
        timestamp: context.timestamp,
        description: "Data group of hula hup",
        specs: "Say nothing and ship ;)",
        data: martingbzSismoThread1LensMirrorersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
