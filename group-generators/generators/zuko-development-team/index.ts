
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
      "thomphreys.eth": "1",
      "0x1dF6bE628F34a964AcFb695CD9F5417DBc95ff42": "1",
      "0xe7910F0b83ad155737043c771E2594f74B0BB739": "1",
      "0xb81B9B88e764cb6b4E02c5D0F6D6D9051A61E020": "1",
    };

    return [
      {
        name: "zuko-development-team",
        timestamp: context.timestamp,
        description: "Data Group of the Zuko Development Team",
        specs: "Development team of Zuko for ETHOnline 2023. Group is for testing purposes only to avoid using impersonation. ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
