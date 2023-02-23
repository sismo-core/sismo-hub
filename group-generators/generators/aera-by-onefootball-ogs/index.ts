
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
      "0xdbAb4E2952d25a7413dB11C79b120dC733F56899": "1",
      "0x4F6823f6989fE0698237899Fc6E14E1F45C088Ad": "1",
      "0xFbD661eB736C103F3c4151DDBe60ECA7C488dec4": "1",
      "0xc055eCe5Ffc569B3113CecE97FB95a78b07f6393": "1",
      "0x375da9Ac681f1e115D14f308df40339DEA1454fE": "1",
      "0x95cB3f93a918754206a1FaD9d6F95Bd244E0D5D6": "1",
      "0x72A62DfDDA6868570E709b01c4315D8c99332e05": "1",
      "0x5f7a3bc3a68e550d0f6594b8ab42ce2de1c744f1": "1",
      "0x5a541637e94bd62cA252d69cb0c1D53d753FE903": "1",
      "0x82E2Ea8022aFB4bB4557F1f7C3649d2Be4E531E3": "1",
      "0xa93dcBAb7e555B4392b723457E5287069Ea02548": "1",
      "0x6959b52dA56ac3257F755b6bC7DB4ea74580de24": "1",
      "0x496fb830acF66Ecc639d7F4bbaD43501f561fe5D": "1",
      "0x51d37257eA31665C9cdB8a5140451EBBd6272122": "1",
      "0xf913fD7d523502B2B36993C94fD87dE4079afeA5": "1",
      "0x750E653A0B0201999135192203C49A5F1932171a": "1",
    };

    return [
      {
        name: "aera-by-onefootball-ogs",
        timestamp: context.timestamp,
        description: "Should be part of the OneFootball Labs Team",
        specs: "Be a member of the OneFootball Labs core team. ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
