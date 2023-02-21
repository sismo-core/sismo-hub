
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
  dependsOn: ["turkiye-earthquake-relief-dao","xdonate-turkey"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const turkiyeEarthquakeReliefDaoGroupLatest = await groupStore.latest(
      "turkiye-earthquake-relief-dao"
    );
    
    const turkiyeEarthquakeReliefDaoData0 = dataOperators.Map(
      await turkiyeEarthquakeReliefDaoGroupLatest.data(),
      1
    );
    
    const xdonateTurkeyGroupLatest = await groupStore.latest(
      "xdonate-turkey"
    );
    
    const xdonateTurkeyData1 = dataOperators.Map(
      await xdonateTurkeyGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      turkiyeEarthquakeReliefDaoData0,
      xdonateTurkeyData1 
    ]);

    return [
      {
        name: "assistance",
        timestamp: context.timestamp,
        description: "let's be real people and help someone else at least once",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
