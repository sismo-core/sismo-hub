
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0xE20eD85154cB685217FcbB67d8cf768B1449882f": "1",
      "0x8e04F5EE6ed7F8b4e25251fF6B6Ad2a3BA232cd4": "1",
      "0xeF4A3a32f0e708EEc119A59185B959c11008Fd62": "1",
      "0x587b9292d90466747e74dfB13144086C769d7e2E": "1",
    };

    return [
      {
        name: "haodi-s-friend",
        timestamp: context.timestamp,
        description: "only for the special list",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
