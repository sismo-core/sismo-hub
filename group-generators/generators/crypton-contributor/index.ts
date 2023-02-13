
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
  dependsOn: ["zk-developer-contributor"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const zkDeveloperContributorGroupLatest = await groupStore.latest(
      "zk-developer-contributor"
    );
    
    const zkDeveloperContributorData0 = dataOperators.Map(
      await zkDeveloperContributorGroupLatest.data(),
      1
    );

    return [
      {
        name: "crypton-contributor",
        timestamp: context.timestamp,
        data: zkDeveloperContributorData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
