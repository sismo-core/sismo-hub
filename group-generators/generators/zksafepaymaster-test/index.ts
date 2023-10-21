
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
      "0x044B595C9b94A17Adc489bD29696af40ccb3E4d2": "1",
      "0x0D1781F0b693b35939A49831A6C799B938Bd2F80": "1",
      "0x464e3F471628E162FA34F130F4C3bCC41fF7635d": "1",
    };

    return [
      {
        name: "zksafepaymaster-test",
        timestamp: context.timestamp,
        description: "Testing the decentralized paymaster solution powered by Safe-Sismo-Gelato",
        specs: "Tesing",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
