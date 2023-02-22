
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
      "0xF1c121A563A84D62a5F11152d064Dd0D554024F9": "1",
    };

    return [
      {
        name: "super-user",
        timestamp: context.timestamp,
        description: "A badge for heavy users of Ethereum to encourage usage",
        specs: "Anyone who interacts with the Ethereum contract more than 500 times can receive this badge",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
