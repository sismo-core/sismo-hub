
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
      "luke0909.eth": "1",
      "0xcCc52f64EE0FFF73ad7312825Ee767cE94d4877A": "1",
      "0x214882C0631D9eb0FDa7337bE458e0e992E0279e": "1",
      "0x22b2cCb53963Da600c83191db1cE3f61f92DCf45": "1",
      "0x99D64BD53DD7E5d8E6845Cb6685c69E79D6A8f41": "1",
      "0x706f9AC0C9d08d725B899cC8C2582620745CF930": "1",
    };

    return [
      {
        name: "retrodao-obol-collaboration",
        timestamp: context.timestamp,
        description: "retrodao obol collaboration",
        specs: "Can participate in retroDAO Private room",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
