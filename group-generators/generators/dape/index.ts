
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
  dependsOn: ["rhinofi-power-users","proof-of-attendance-main-events","ethereum-power-users","sismo-early-users"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const rhinofiPowerUsersGroupLatest = await groupStore.latest(
      "rhinofi-power-users"
    );
    
    const rhinofiPowerUsersData0 = dataOperators.Map(
      await rhinofiPowerUsersGroupLatest.data(),
      1
    );
    
    const proofOfAttendanceMainEventsGroupLatest = await groupStore.latest(
      "proof-of-attendance-main-events"
    );
    
    const proofOfAttendanceMainEventsData1 = dataOperators.Map(
      await proofOfAttendanceMainEventsGroupLatest.data(),
      1
    );
    
    const ethereumPowerUsersGroupLatest = await groupStore.latest(
      "ethereum-power-users"
    );
    
    const ethereumPowerUsersData2 = dataOperators.Map(
      await ethereumPowerUsersGroupLatest.data(),
      1
    );
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData3 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      rhinofiPowerUsersData0,
      proofOfAttendanceMainEventsData1,
      ethereumPowerUsersData2,
      sismoEarlyUsersData3 
    ]);

    return [
      {
        name: "dape",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
