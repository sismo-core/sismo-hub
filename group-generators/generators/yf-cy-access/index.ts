
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
      "0x13a6D1fe418de7e5B03Fb4a15352DfeA3249eAA4": "1",
      "0x02bD49dB090EEB2F77Aad7d313028b7D9e288c8E": "1",
    };

    return [
      {
        name: "yf-cy-access",
        timestamp: context.timestamp,
        description: "Data group of lyf and lcy access",
        specs: "Data group of lyf and lcy access",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
