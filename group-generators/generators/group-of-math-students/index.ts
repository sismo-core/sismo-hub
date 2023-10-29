
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
  
    
 const jsonListData0 = {
      "0x3DdFBcF4375d2cFa36A71819ca5F6f0F018255eD": "1",
      "0xF7EE427655dB4017BD445e8ef20dFb5e96ad892b":"1",
    };
    return [
      {
        name: "group-of-math-students",
        timestamp: context.timestamp,
        description: "Data Group of Math Students",
        specs: "NA",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
