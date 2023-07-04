
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const jsonListData0 = {
      "sismo-connect-app(appid=0x3bcdab2ad3caddb11b90b02bde258f6b):0x244621f0aa0bc878f70524e274dd385787eda22d90f24d6aa8eba9b5f04004d3": "1",
      "sismo-connect-app(appid=0x3bcdab2ad3caddb11b90b02bde258f6b):0x0c44ef638a384af02802b2c5322970ae05ed7ddc09b2b9d804b6acecc2b47072": "1",
      "sismo-connect-app(appid=0x3bcdab2ad3caddb11b90b02bde258f6b):0x0ede11de382d6cceb197d36f4ab9eede50f9c2ab353c37593413e0f97f75bd75": "1"
    };

    return [
      {
        name: "world-id-dev",
        timestamp: context.timestamp,
        description: "World ID dev group",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.SybilResistance],
      },
    ];
  },
};

export default generator;
