
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
      "0xB8C3CC00Fdd5C24dFeb9c5609203A0D434283c9C": "1",
      "0xC536977f5207eCe8ff654F92861426cD27c5aB5B": "1",
    };

    return [
      {
        name: "test-badge",
        timestamp: context.timestamp,
        description: "This is a test badge only available to the badge creator",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
