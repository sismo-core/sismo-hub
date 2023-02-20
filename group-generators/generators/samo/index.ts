
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
  dependsOn: ["proof-of-attendance-main-events"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const proofOfAttendanceMainEventsGroupLatest = await groupStore.latest(
      "proof-of-attendance-main-events"
    );
    
    const proofOfAttendanceMainEventsData0 = dataOperators.Map(
      await proofOfAttendanceMainEventsGroupLatest.data(),
      1
    );

    return [
      {
        name: "samo",
        timestamp: context.timestamp,
        description: "If you hold a conference POAP and have met Samo",
        specs: "",
        data: proofOfAttendanceMainEventsData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
