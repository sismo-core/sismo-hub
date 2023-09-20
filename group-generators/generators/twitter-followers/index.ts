
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
      "0xf553650594834b251648b225EC5790448281E473": "50000",
      "0x228A9d45a362358cCAA4c380586E62933FF4c390": "2300",
      "0x1022794E8FcD336359ff3c681836638D51fa8234": "4500",
      "0xa96Bd3e47D7dEA707253798F361e0e10215A3FA4": "9000",
      "0xe8187b0899A1855d2BD38D722b23982ABa8b0B14": "1200",
    };

    return [
      {
        name: "twitter-followers",
        timestamp: context.timestamp,
        description: "Twitter followers",
        specs: "This group show how many Twitter followers you have",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
