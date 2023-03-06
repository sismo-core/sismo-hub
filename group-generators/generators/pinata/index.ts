
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
        name: "pinata",
        timestamp: context.timestamp,
        description: "hold zk badge aztec user",
        specs: "",
        data: aztecConnectDepositorsData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
