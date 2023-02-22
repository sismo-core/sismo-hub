
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
  dependsOn: ["turkiye-earthquake-relief-dao"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const turkiyeEarthquakeReliefDaoGroupLatest = await groupStore.latest(
      "turkiye-earthquake-relief-dao"
    );
    
    const turkiyeEarthquakeReliefDaoData0 = dataOperators.Map(
      await turkiyeEarthquakeReliefDaoGroupLatest.data(),
      1
    );

    return [
      {
        name: "love",
        timestamp: context.timestamp,
        description: "TURKIYE Earthquake",
        specs: "",
        data: turkiyeEarthquakeReliefDaoData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
