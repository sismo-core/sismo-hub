
import { dataOperators } from "@group-generators/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["sismo-contributors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData0 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );

    return [
      {
        name: "ethermail",
        timestamp: context.timestamp,
        description: "have a Sismo Contributor ZK Badge, and support WEB3 mail vision",
        specs: "",
        data: sismoContributorsData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
