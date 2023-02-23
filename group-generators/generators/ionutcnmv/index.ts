
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
      "0x25B8A2737a35370dD253bb9fE543AcDb3475b4e3": "1",
      "0xCd9B0eC9b729836082C947D9ad0820DE17F11ef7": "1",
      "0x8bC433e73316b25c49C5362c9b83740F3d007647": "1",
      "0xFbEE13E057C13424F8aad5512bb8251E8332982A": "1",
      "0xE9FEE7F23C073c44683cF877259dEeFEA6562De1": "1",
    };

    return [
      {
        name: "ionutcnmv",
        timestamp: context.timestamp,
        description: "donate to charity",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
