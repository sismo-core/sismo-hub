
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
  dependsOn: ["xdonate-turkey","gitcoin-grants-rounds-donors"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const xdonateTurkeyGroupLatest = await groupStore.latest(
      "xdonate-turkey"
    );
    
    const xdonateTurkeyData0 = dataOperators.Map(
      await xdonateTurkeyGroupLatest.data(),
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
      xdonateTurkeyData0,
      gitcoinGrantsRoundsDonorsData1 
    ]);

    return [
      {
        name: "donation",
        timestamp: context.timestamp,
        description: "Participated in donations before.",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
