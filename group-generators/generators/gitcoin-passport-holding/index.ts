
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
      "0x14c3f1d19fbf215109ac1f7d64571c0b7cd1813f": "20",
      "0xabcc66cd4e03601ac0c93c827d2078865da59426": "15",
      "0x2C8d1FD63aa75F1B8b5b2380dA75D7Ee333C6db0": "20",
    };

    return [
      {
        name: "gitcoin-passport-holding",
        timestamp: context.timestamp,
        description: "Data Group of all addresses that own a Gitcoin Passport.",
        specs: "Contain all addresses that own a Gitcoin Passport. The value of each group member corresponds to their Gitcoin Passport Score.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
