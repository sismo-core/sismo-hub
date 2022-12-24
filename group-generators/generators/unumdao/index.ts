
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
      "0x6C0Fb2ce8A5Cc9eC6050483b2B2DCF30CD98D01a": "1",
      "0x6e43f1951Be85a12Ff95d6f7300E6fdb7436928b": "1",
      "0xC25c17Dd6Dfd2945E04C96F46DdB85401C332D01": "1",
      "0xb184b78Aa5Fa4214307C3836C37E92FC36858B41": "1",
      "0x206217CF39a02abdEF61B6764c38265Eb3A3e31B": "1",
      "0x3D2f5127c0fBd4BA0d2823Ef26245280cD4DA24d": "1",
      "0x6814908fFe738c3F729385d38621e8933832Ce8B": "1",
      "0xCb31f0beCfc9D011676E7F84CbCD10fe4717f252": "1",
      "0xe48fE6012f97b6A13C0Ce5cEF314cAF66E972deB": "1",
    };

    return [
      {
        name: "unumdao",
        timestamp: context.timestamp,
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
