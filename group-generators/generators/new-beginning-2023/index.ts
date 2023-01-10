
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
  dependsOn: ["mice-derp-early","commitdao","lenster-gas-supporter","ethereum-power-users","proof-of-humanity","gitcoin-grants-rounds-donors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const miceDerpEarlyGroupLatest = await groupStore.latest(
      "mice-derp-early"
    );
    
    const miceDerpEarlyData0 = dataOperators.Map(
      await miceDerpEarlyGroupLatest.data(),
      1
    );
    
    const commitdaoGroupLatest = await groupStore.latest(
      "commitdao"
    );
    
    const commitdaoData1 = dataOperators.Map(
      await commitdaoGroupLatest.data(),
      1
    );
    
    const lensterGasSupporterGroupLatest = await groupStore.latest(
      "lenster-gas-supporter"
    );
    
    const lensterGasSupporterData2 = dataOperators.Map(
      await lensterGasSupporterGroupLatest.data(),
      1
    );
    
    const ethereumPowerUsersGroupLatest = await groupStore.latest(
      "ethereum-power-users"
    );
    
    const ethereumPowerUsersData3 = dataOperators.Map(
      await ethereumPowerUsersGroupLatest.data(),
      1
    );
    
    const proofOfHumanityGroupLatest = await groupStore.latest(
      "proof-of-humanity"
    );
    
    const proofOfHumanityData4 = dataOperators.Map(
      await proofOfHumanityGroupLatest.data(),
      1
    );
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-rounds-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData5 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      miceDerpEarlyData0,
      commitdaoData1,
      lensterGasSupporterData2,
      ethereumPowerUsersData3,
      proofOfHumanityData4,
      gitcoinGrantsRoundsDonorsData5 
    ]);

    return [
      {
        name: "new-beginning-2023",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
