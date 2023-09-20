
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
      "0x27Ab79D90748c8b5028f02c5C795FBDe0D0d189c": "1",
      "0x228A9d45a362358cCAA4c380586E62933FF4c390": "1",
    };

    return [
      {
        name: "harpos",
        timestamp: context.timestamp,
        description: "Data Group My whitelist 2.0",
        specs: "This data group is for test purposes. It can be deleted on July 24th ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
