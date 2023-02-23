
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
  dependsOn: ["zklend-poap-contributor"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const zklendPoapContributorGroupLatest = await groupStore.latest(
      "zklend-poap-contributor"
    );
    
    const zklendPoapContributorData0 = dataOperators.Map(
      await zklendPoapContributorGroupLatest.data(),
      1
    );

    return [
      {
        name: "megumi",
        timestamp: context.timestamp,
        description: "follow @P3HqDkrtvTk14Yz",
        specs: "follow @P3HqDkrtvTk14Yz",
        data: zklendPoapContributorData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
