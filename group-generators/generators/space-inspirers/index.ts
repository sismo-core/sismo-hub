
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const hiveProvider = new dataProviders.HiveProvider();
    
    const hiveProviderData0 = await hiveProvider.getInfluencersFromClusterWithMinimumFollowers({
      clusterName: "space"
    });

    return [
      {
        name: "space-inspirers",
        timestamp: context.timestamp,
        description: "Verified as significant space community persona by Hive.one.",
        specs: "",
        data: hiveProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
