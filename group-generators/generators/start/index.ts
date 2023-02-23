
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
  dependsOn: ["rahulkr-lens-followers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const rahulkrLensFollowersGroupLatest = await groupStore.latest(
      "rahulkr-lens-followers"
    );
    
    const rahulkrLensFollowersData0 = dataOperators.Map(
      await rahulkrLensFollowersGroupLatest.data(),
      1
    );

    return [
      {
        name: "start",
        timestamp: context.timestamp,
        description: "123labs.eth",
        specs: "",
        data: rahulkrLensFollowersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
