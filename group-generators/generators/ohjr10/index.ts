
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
  dependsOn: ["nftyard-lens-follower","gitcoin-grants-rounds-donors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const nftyardLensFollowerGroupLatest = await groupStore.latest(
      "nftyard-lens-follower"
    );
    
    const nftyardLensFollowerData0 = dataOperators.Map(
      await nftyardLensFollowerGroupLatest.data(),
      1
    );
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-round-15-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData1 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      nftyardLensFollowerData0,
      gitcoinGrantsRoundsDonorsData1 
    ]);

    return [
      {
        name: "ohjr10",
        timestamp: context.timestamp,
        description: "follow  https://twitter.com/ohJR10",
        specs: "@ohJR10",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
