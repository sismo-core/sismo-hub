
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
  dependsOn: ["degenscore-beacon"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const degenscoreBeaconGroupLatest = await groupStore.latest(
      "degenscore-beacon"
    );
    
    const degenscoreBeaconData0 = dataOperators.Map(
      await degenscoreBeaconGroupLatest.data(),
      1
    );

    return [
      {
        name: "ai-degen-contributor",
        timestamp: context.timestamp,
        data: degenscoreBeaconData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
