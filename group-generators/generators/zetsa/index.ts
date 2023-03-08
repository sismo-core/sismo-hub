
import { dataOperators } from "@group-generators/data-operators";
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
        name: "zetsa",
        timestamp: context.timestamp,
        description: "HOLD  Aztec User ZK Badge",
        specs: "",
        data: aztecConnectDepositorsData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
