
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
      "0xf40f09dbAd74EC2C861c2EC0410fFEd9b12a6720": "1",
      "th3x4v.eth": "1",
    };

    return [
      {
        name: "thecryptoshepherd-xyz",
        timestamp: context.timestamp,
        description: "Signup to the beta version",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
