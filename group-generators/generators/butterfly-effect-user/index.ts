
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["aztec-connect-depositors","degenscore-beacon","sismo-stargazers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const aztecConnectDepositorsGroupLatest = await groupStore.latest(
      "aztec-connect-depositors"
    );
    
    const aztecConnectDepositorsData0 = dataOperators.Map(
      await aztecConnectDepositorsGroupLatest.data(),
      1
    );
    
    const degenscoreBeaconGroupLatest = await groupStore.latest(
      "degenscore-beacon"
    );
    
    const degenscoreBeaconData1 = dataOperators.Map(
      await degenscoreBeaconGroupLatest.data(),
      1
    );
    
    const sismoStargazersGroupLatest = await groupStore.latest(
      "sismo-stargazers"
    );
    
    const sismoStargazersData2 = dataOperators.Map(
      await sismoStargazersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      aztecConnectDepositorsData0,
      degenscoreBeaconData1,
      sismoStargazersData2 
    ]);

    return [
      {
        name: "butterfly-effect-user",
        timestamp: context.timestamp,
        description: "Hold a Degenscore NFT, a ZK badge, stargazer ZK badge.",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
