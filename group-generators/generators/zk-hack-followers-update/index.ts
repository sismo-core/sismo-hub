
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["zk-hack-followers",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const zkHackFollowersGroupLatest = await groupStore.latest(
      "zk-hack-followers"
    );
    
    const zkHackFollowersData0 = dataOperators.Map(
      await zkHackFollowersGroupLatest.data(),
      1
    );
    
    const jsonListData1 = {
      "twitter:BigSky_7": "1",
    };
    
    const dataUnion = dataOperators.Union([
      zkHackFollowersData0,
      jsonListData1 
    ]);

    return [
      {
        name: "zk-hack-followers-update",
        timestamp: context.timestamp,
        description: "Updated ZK-Hack follower Group",
        specs: "Group for all followers of ZK Hack",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
