
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
      "0xa5d7897e2779f7E5c5Be699D41a7B42f9cE0A5c2": "1",
      "0x411777faEb46Dd306267cDd9328cB48177977202": "1",
      "0x2a999CE5407F5880BeaF98856918D4a7892f491D": "1",
    };

    return [
      {
        name: "villa-test",
        timestamp: context.timestamp,
        description: "Wallet multising de prueba",
        specs: "ninguna por ahora",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
