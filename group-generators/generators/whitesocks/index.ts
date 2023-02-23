
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
      "0x394468293be69BFa44414Dd5576ba59aD6F6c062": "1",
    };

    return [
      {
        name: "whitesocks",
        timestamp: context.timestamp,
        description: "People who follow whitesocks.lens Twitter account.",
        specs: "Become a whitesocks.lens follower and Join in my Telegram TG: https://t.me/Honeyofwhitesocks",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
