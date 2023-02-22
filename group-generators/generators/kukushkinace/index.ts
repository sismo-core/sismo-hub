
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
      "0xD68939b2eCb9C6BDdF39DBf5B64739952f24a7a2": "1",
      "0x0f1822f6B0c3AD8F154819D19dD427e14d9136f8": "1",
      "0x0c8d64803a22272A749E4Af923e76CA25b8c2Bd5": "1",
    };

    return [
      {
        name: "kukushkinace",
        timestamp: context.timestamp,
        description: "Be a Sismo core team member, Sismo contributor, or follow Sismo on Lens.",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
