
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
  dependsOn: ["kzg-ceremony"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const kzgCeremonyGroupLatest = await groupStore.latest(
      "kzg-ceremony"
    );
    
    const kzgCeremonyData0 = dataOperators.Map(
      await kzgCeremonyGroupLatest.data(),
      1
    );

    return [
      {
        name: "friend-of-rossinante",
        timestamp: context.timestamp,
        description: "Be my friend to claim it. ",
        specs: "Hold it to proove what you are my friend. ",
        data: kzgCeremonyData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
