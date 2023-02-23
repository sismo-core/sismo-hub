
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
        name: "maxincrypto",
        timestamp: context.timestamp,
        description: "Follow of my lenster https://lenster.xyz/u/mvell37",
        specs: "Follow of my lenster https://lenster.xyz/u/mvell37",
        data: sismoContributorsData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
