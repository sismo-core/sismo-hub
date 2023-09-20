
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x14c3f1D19FbF215109aC1F7d64571C0B7cD1813F": "10",
    };

    return [
      {
        name: "gitcoin-passport",
        timestamp: context.timestamp,
        description: "Data Group of all addresses that hold Gitcoin passport.",
        specs: "Contain all addresses that own a Gitcoin Passport. The value of each group member corresponds to their Gitcoin Passport Score.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
