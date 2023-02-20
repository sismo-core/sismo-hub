
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
      "0x8e6Bd76E2FEceAB4376e64F4B8D696e2311743BD": "1",
      "0x1834a841b098a9eB861c2baf6656076C2B9f7458": "1",
      "0x9748Bb4600FE2337454605134cfB4490e9Bb64F3": "1",
      "0x5301C3862dB67c00ADf65842F5eAa8d8cC89DAf3": "1",
    };

    return [
      {
        name: "dorian-gray",
        timestamp: context.timestamp,
        description: "white listed addresses",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
