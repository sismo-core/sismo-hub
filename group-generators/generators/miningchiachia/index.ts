
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
  dependsOn: ["sismo-early-users","sismo-masquerade-lens-followers","ethereum-power-users","proof-of-humanity","gitcoin-grants-rounds-donors","proof-of-attendance-main-events","ens-supporters","twitter-ethereum-influencers","rhinofi-power-users","sismo-contributors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData0 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );
    
    const sismoMasqueradeLensFollowersGroupLatest = await groupStore.latest(
      "sismo-masquerade-lens-followers"
    );
    
    const sismoMasqueradeLensFollowersData1 = dataOperators.Map(
      await sismoMasqueradeLensFollowersGroupLatest.data(),
      1
    );
    
    const ethereumPowerUsersGroupLatest = await groupStore.latest(
      "ethereum-power-users"
    );
    
    const ethereumPowerUsersData2 = dataOperators.Map(
      await ethereumPowerUsersGroupLatest.data(),
      1
    );
    
    const proofOfHumanityGroupLatest = await groupStore.latest(
      "proof-of-humanity"
    );
    
    const proofOfHumanityData3 = dataOperators.Map(
      await proofOfHumanityGroupLatest.data(),
      1
    );
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-rounds-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData4 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const proofOfAttendanceMainEventsGroupLatest = await groupStore.latest(
      "proof-of-attendance-main-events"
    );
    
    const proofOfAttendanceMainEventsData5 = dataOperators.Map(
      await proofOfAttendanceMainEventsGroupLatest.data(),
      1
    );
    
    const ensSupportersGroupLatest = await groupStore.latest(
      "ens-supporters"
    );
    
    const ensSupportersData6 = dataOperators.Map(
      await ensSupportersGroupLatest.data(),
      1
    );
    
    const twitterEthereumInfluencersGroupLatest = await groupStore.latest(
      "twitter-ethereum-influencers"
    );
    
    const twitterEthereumInfluencersData7 = dataOperators.Map(
      await twitterEthereumInfluencersGroupLatest.data(),
      1
    );
    
    const rhinofiPowerUsersGroupLatest = await groupStore.latest(
      "rhinofi-power-users"
    );
    
    const rhinofiPowerUsersData8 = dataOperators.Map(
      await rhinofiPowerUsersGroupLatest.data(),
      1
    );
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData9 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      sismoEarlyUsersData0,
      sismoMasqueradeLensFollowersData1,
      ethereumPowerUsersData2,
      proofOfHumanityData3,
      gitcoinGrantsRoundsDonorsData4,
      proofOfAttendanceMainEventsData5,
      ensSupportersData6,
      twitterEthereumInfluencersData7,
      rhinofiPowerUsersData8,
      sismoContributorsData9 
    ]);

    return [
      {
        name: "miningchiachia",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
