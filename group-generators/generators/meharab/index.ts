
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
      "0xC506dB1beb6555B1b887AD2aC518d9676Fa95e6b": "1",
      "0x7bB0f8a2B8f921069C75d0520C0f1C714366bC16": "1",
      "0x0D8444f2d3f93AB117392d461e84D22F2A638C12": "1",
      "0x4ABA7ce152cdA638020F060C3873e9452059af27": "1",
      "0x0a7e48aD5F66F39D81ae7fe560EDcd3C00d2D34A": "1",
    };

    return [
      {
        name: "meharab",
        timestamp: context.timestamp,
        description: "follow me on twitter",
        specs: "follow, like and retweet all of my tweets ... !!!",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
