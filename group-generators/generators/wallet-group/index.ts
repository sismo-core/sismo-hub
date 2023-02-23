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
    return [
      {
        name: "wallet-group",
        timestamp: context.timestamp,
        description: "everyone in wechat group can get this badge",
        specs: "everyone in wechat and submit address can get this",
        data: {
          "0x3DF10334531A3c86590245e12Be0104Dd3459159": "1",
          "0x9467397D6e52c2b953d8Cb81a02798bCA877735A": "1",
          "0x252915CB73c4A1fB6b947f99bb8C43E4F4dD70Eb": "1",
          "0xaf2f2Ad6101b9c824E0D27A9521e24736Ce8f845": "1",
          "0x1eb0c5E82Fd71ee6E2015745620347e1FD094797": "1",
          "0xa9D49e486477954200b4f9005d95ce1b6594B72c": "1",
          "0xf7802FDFEa35382468Be17D8099556bE0E27978a": "1",
          "0x3A66f1f337166e24C102b6Ce8151d951f214E9cF": "1",
          "0xF3eC1e71bDBee55b844072E597Cb491FA6AD1135": "1",
          "0xcb9c42354FF3E7D763161Cb6DCC3452f0842f9aE": "1",
          "0x0e211b3dd01aFCdDf79db8083981F44d8071A1b4": "1",
          "0xe76BCbe8d3Bf4AD334D07fdB00AABa510fFEfA37": "1",
          "0x76d0Ea9D019dE421Add5d06A3A7D5743D9C56465": "1",
          "0x32314dcDD83a71154586F195fE528DeeAAfb943C": "1",
          "0x314e58DDd52282F2f241785e7312c73E6084bA4b": "1",
          "0x5E3A437412b980528211227F62A2fa6Ea71B4375": "1",
          "0xC87C56ED8838e629e89e9351422dcE23bEE9Fa04": "1",
          "0x9EE41Ea35da2FD1e01D136EC06F8951E50156175": "1",
          "0x18dbF54620E3A7728B7B6746E39238135DbA685D": "1",
          "0x21c3a619B73c8D5CdA7AE74f100b86721E73654E": "1",
          "0xa9E8e14Fa189692533ef582265DbD330780B250b": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
