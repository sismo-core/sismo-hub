
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
  dependsOn: ["sismo-early-users","sismo-masquerade-lens-followers","ethereum-power-users","proof-of-humanity","gitcoin-grants-rounds-donors","ens-supporters","sismo-contributors",],
  
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
    
    const ensSupportersGroupLatest = await groupStore.latest(
      "ens-supporters"
    );
    
    const ensSupportersData5 = dataOperators.Map(
      await ensSupportersGroupLatest.data(),
      1
    );
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData6 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );
    
    const jsonListData7 = {
      "0x71648d760570A70E76065291b996BCF9D362aF61": "1",
      "0x049D0bd599051D6356CfC8533aCee912243786a3": "1",
      "0x10bF1845c4333e138ddb7c94E6D15887D677bC85": "1",
      "0x68370cDb1126BCd12A42780789B728497C16B9CC": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      sismoEarlyUsersData0,
      sismoMasqueradeLensFollowersData1,
      ethereumPowerUsersData2,
      proofOfHumanityData3,
      gitcoinGrantsRoundsDonorsData4,
      ensSupportersData5,
      sismoContributorsData6,
      jsonListData7 
    ]);

    return [
      {
        name: "cryptohomo",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
