
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
  dependsOn: ["aztec-connect-depositors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const aztecConnectDepositorsGroupLatest = await groupStore.latest(
      "aztec-connect-depositors"
    );
    
    const aztecConnectDepositorsData0 = dataOperators.Map(
      await aztecConnectDepositorsGroupLatest.data(),
      1
    );

    return [
      {
        name: "ichibiton-fren",
        timestamp: context.timestamp,
        description: "Aztec user badge",
        specs: "You must have Aztec User Badge",
        data: aztecConnectDepositorsData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
