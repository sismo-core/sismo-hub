
import { ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const jsonListData0 = {
      "demo.eth": "1",
    };

    return [
      {
        name: "proof-of-personhood-demo",
        timestamp: context.timestamp,
        description: "Data Group of an impersonated user that went through Proof of Liveness from Synaps, for Demo purpose in Sismo Swag Box Lottery App.",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
