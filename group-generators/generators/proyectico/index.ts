
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
      "0x4AD6A33069732CAf3E20A0e44B306F7eB4e4be79": "1",
    };

    return [
      {
        name: "proyectico",
        timestamp: context.timestamp,
        description: "Usuarios validados por ZKP",
        specs: "Usuarios para la demostración de como ZKP mejor la privacidad",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
