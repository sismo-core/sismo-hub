
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
  dependsOn: ["sismo-contributors","gitcoin-grants-rounds-donors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoContributorsGroupLatest = await groupStore.latest(
      "sismo-contributors"
    );
    
    const sismoContributorsData0 = dataOperators.Map(
      await sismoContributorsGroupLatest.data(),
      1
    );
    
    const gitcoinGrantsRoundsDonorsGroupLatest = await groupStore.latest(
      "gitcoin-grants-rounds-donors"
    );
    
    const gitcoinGrantsRoundsDonorsData1 = dataOperators.Map(
      await gitcoinGrantsRoundsDonorsGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      sismoContributorsData0,
      gitcoinGrantsRoundsDonorsData1 
    ]);

    return [
      {
        name: "freeman",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
