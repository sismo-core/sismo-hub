
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
      "0x26f807397390E6d91b940215Fa71647f3C4d4395": "1",
      "0x7dF7b2cF382156AeA1332A558FAdc77eba1b30a2": "1",
      "0xC134f280C35dFD5ccD47Ea1584e987aB64389fC6": "1",
      "0x915e4A5A70eb341e540A40A0629FD880E5861ba8": "1",
      "0xCb12102493E513eD5e32FBC36864569bAd2812Bd": "1",
      "0x8F57948779195cc2EacaA0633efE093085131ee9": "1",
      "0xf9fed4b7a8A6B410fB6B1d76459b66D05c613E49": "1",
      "0xbe13517a2b520b2449068D2ec45280992B04047B": "1",
      "0x039c7320956110b7e9e350d382a354d6ace8d2c0": "1",
      "0xB1E6Cf9f87a0CDc408E83d81602da27F0DCB6636": "1",
      "0xB2aEBeD8597C7e94BdC1c8619375825ec04a0AE8": "1",
      "0x19e6828489f0CB673F815fFF1673C00d1aA8A8eb": "1",
      "0x8296054409D8516B80d0bF6f1d9f5c31ecA544ee": "1",
      "0xCB36bbBEB8Ea1900472BbD35032C3f0000cCDf2F": "1",
      "0x371Ea1E8FcB52083a2A6Ee8Bb44Bb5540939fB82": "1",
      "0xec07CE9c26BAb652e14D81E6278da3A6eA5004D6": "1",
      "0x78035856Fc9CcaA36b2F2e95E5FEeC0Fc1F8dede": "1",
    };

    return [
      {
        name: "candydao-2022-contributor-of-the-year-member",
        timestamp: context.timestamp,
        description: "CandyDAO 2022 Annual Event",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
