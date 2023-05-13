
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
      "0x1EC75BaBD4CDe5Fe58D7268bb3F2C34B534F8d81": "1",
      "0xb51130Bb78067440bEc9074330Dce939C6748908": "1",
      "0x9090A5d516f2054007bD184caf55760B51fcFBfD": "1",
    };

    return [
      {
        name: "firsttest",
        timestamp: context.timestamp,
        description: "first test",
        specs: "first test",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
