
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
  dependsOn: ["rahulkr-lens-followers"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x257cDAFEd2d4FEC6C992091602967dF52c11bf86": "1",
      "0x53A2eAcDaEDaC93AED3F0c96c34B733F3E054CDa": "1",
      "0x0B1749E8691290B88b70A777693CC6Ecf041cd48": "1",
    };
    
    const rahulkrLensFollowersGroupLatest = await groupStore.latest(
      "rahulkr-lens-followers"
    );
    
    const rahulkrLensFollowersData1 = dataOperators.Map(
      await rahulkrLensFollowersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      rahulkrLensFollowersData1 
    ]);

    return [
      {
        name: "sismo-oarctic",
        timestamp: context.timestamp,
        description: "followers lens",
        specs: "NFT gets those who are follower lens",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
