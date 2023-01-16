
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
  dependsOn: ["lenster-gas-supporter","mice-derp-early","coin-center-donators","digi"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const lensterGasSupporterGroupLatest = await groupStore.latest(
      "lenster-gas-supporter"
    );
    
    const lensterGasSupporterData0 = dataOperators.Map(
      await lensterGasSupporterGroupLatest.data(),
      1
    );
    
    const miceDerpEarlyGroupLatest = await groupStore.latest(
      "mice-derp-early"
    );
    
    const miceDerpEarlyData1 = dataOperators.Map(
      await miceDerpEarlyGroupLatest.data(),
      1
    );
    
    const coinCenterDonatorsGroupLatest = await groupStore.latest(
      "coin-center-donators"
    );
    
    const coinCenterDonatorsData2 = dataOperators.Map(
      await coinCenterDonatorsGroupLatest.data(),
      1
    );
    
    const digiGroupLatest = await groupStore.latest(
      "digi"
    );
    
    const digiData3 = dataOperators.Map(
      await digiGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      lensterGasSupporterData0,
      miceDerpEarlyData1,
      coinCenterDonatorsData2,
      digiData3 
    ]);

    return [
      {
        name: "tech",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
