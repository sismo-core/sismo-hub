
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
      "0x1dF6bE628F34a964AcFb695CD9F5417DBc95ff42": "1",
      "0x595ec62736Bf19445d7F00D66072B3a3c7aeA0F5": "1",
      "0xb81B9B88e764cb6b4E02c5D0F6D6D9051A61E020": "1",
      "0xe7910F0b83ad155737043c771E2594f74B0BB739": "1",
    };

    return [
      {
        name: "zuko-dev-group-v2",
        timestamp: context.timestamp,
        description: "Data group of the Zuko development team, v2",
        specs: "Just the dev members plus some additional tester addresses",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
