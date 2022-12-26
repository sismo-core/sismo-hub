
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
  dependsOn: ["gitcoin-grants-rounds-donors","sismo-contributors","sismo-early-users","twitter-ethereum-influencers",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-rounds-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData0 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData1 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData2 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );
    
    const twitterEthereumInfluencersGroupLatest = await groupStore.latest(
      "twitter-ethereum-influencers"
    );
    
    const twitterEthereumInfluencersData3 = dataOperators.Map(
      await twitterEthereumInfluencersGroupLatest.data(),
      1
    );
    
    const jsonListData4 = {
      "0x71648d760570A70E76065291b996BCF9D362aF61": "1",
      "0x049D0bd599051D6356CfC8533aCee912243786a3": "1",
      "0x10bF1845c4333e138ddb7c94E6D15887D677bC85": "1",
      "0x68370cDb1126BCd12A42780789B728497C16B9CC": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      gitcoinGrantsRoundsDonorsData0,
      sismoContributorsData1,
      sismoEarlyUsersData2,
      twitterEthereumInfluencersData3,
      jsonListData4 
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
