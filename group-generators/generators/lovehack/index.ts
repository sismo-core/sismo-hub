
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
  dependsOn: ["thub-contributor"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const thubContributorGroupLatest = await groupStore.latest(
      "thub-contributor"
    );
    
    const thubContributorData0 = dataOperators.Map(
      await thubContributorGroupLatest.data(),
      1
    );

    return [
      {
        name: "lovehack",
        timestamp: context.timestamp,
        description: "lovehack.eth",
        specs: "",
        data: thubContributorData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
