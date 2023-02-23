
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
      "0x0e211b3dd01aFCdDf79db8083981F44d8071A1b4": "1",
      "0x1eb0c5E82Fd71ee6E2015745620347e1FD094797": "1",
      "0x252915CB73c4A1fB6b947f99bb8C43E4F4dD70Eb": "1",
      "0x3A66f1f337166e24C102b6Ce8151d951f214E9cF": "1",
      "0x9467397D6e52c2b953d8Cb81a02798bCA877735A": "1",
      "0xF3eC1e71bDBee55b844072E597Cb491FA6AD1135": "1",
      "0xa9D49e486477954200b4f9005d95ce1b6594B72c": "1",
      "0xaf2f2Ad6101b9c824E0D27A9521e24736Ce8f845": "1",
      "0xcb9c42354FF3E7D763161Cb6DCC3452f0842f9aE": "1",
      "0xf7802FDFEa35382468Be17D8099556bE0E27978a": "1",
      "0x18dDc7B69f2cc9a2f642376f380cE257Ade31704": "1",
      "0x6F8217bce5F9486aA1128ae6aE5C2580c6E8b4fE": "1",
      "0x81758DDA2D051a24d759Ea7Cb70FDf0705207C09": "1",
      "0x8209497c85df220b9a21461B826EcE75c1F24A69": "1",
      "0x9C9D5F7193E2Ef34a0563aAFB8b83763D10de2b0": "1",
      "0x9d10dDAd36Ec6f00AA2942f6F891C244d90518EC": "1",
      "0xD6600262e9Dc4DF9d19Cd4222c5734b1CC36235e": "1",
      "0xb309acd9b5974AE44e1bcc6efECE5744b8E614f7": "1",
      "0xcb2d66d5EF6652478b08D39EA3f1CB07A3Bb4ca9": "1",
      "0xf8B3573d0b655aA8dBEBf3bE917550305bE4AbF1": "1",
      "0x45e5EddF330b6c14a8C567510f4fc22373123641": "1",
      "0x5ce1Fc1A670C0cFEEA494AC7a4Bd08B56b7b4804": "1",
      "0x6268936c43Aa304000BB12924aeb266db137aAC0": "1",
      "0x64E475192D4D3e3C9E6896E5b04cD49657033cAb": "1",
      "0x74F6dfC0f909e282CDDDf566D1266c072490f2c9": "1",
      "0x7a5C55047e41285A2d27FC642196163e7D2a4d69": "1",
      "0xFe415366aD5D4e425C3916ABBA551Cf0397521ED": "1",
      "0xa26902e150A6B5E8dFdd03DfEAA1E8BCF3981057": "1",
      "0xf6C86576f10e1c5f94a3637aB413CFc84dEc6803": "1",
      "0xfd662d65657824e270a8c522E57736c6e08FFECA": "1",
    };

    return [
      {
        name: "moon-dao",
        timestamp: context.timestamp,
        description: "be part of moon dao owner or mermber",
        specs: "be part of moon dao owner or mermber",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
