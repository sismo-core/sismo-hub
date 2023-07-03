
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
      "0x709F93211cC8328815597dD3638b691Fc2692480": "1",
      "0x15AE13569Aa35c207f7cF6B13F2d1E2102B0B1f7": "1",
      "0xA7F0d82F788f3efE506460672c4cd8067E75fA98": "1",
      "0x9e37c06D68DF65E2466943c51F3762E83a139125": "1",
      "0x4af2e13eb17584621405677B4A5798463414e76b": "1",
      "0xc65037CFBbcc884502a0093C0196ce69CbFaa7a8": "1",
      "0xBae6Bf59C8151e85D2f8Ea65Ba911fd62c6b7ebc": "1",
      "0xb8b42240a21D5EF8c2308eBf74C3B087b9AA7c4E": "1",
      "0x7B177350bC89A584F0C2e24dA442B54690aDFaF9": "1",
      "0x85570B7b32b5989beeCA942e8b081E68171Cab23": "1",
      "0xb618ff0CEF0D0E668CACA2152722A3c0a0646333": "1",
      "0x86BAaDD0F76fB2023ac695C6aFb8C4Ba222e0105": "1",
      "0xB96914F6494178D6C3B6781D7bdc54532Cf69dAB": "1",
      "0xFBe79705DF134FAFcB90fBE82cc86F592DF0D4BA": "1",
      "0xe330579CAdb2CE0801FbE2490C76E0C4DE18138d": "1",
      "0xC5F55211b0ACe4AaB7Cf2AA72731386f9c9B1A93": "1",
      "0x9436f61Fcb182073aA537D99b5aCE6Caf68dBaeb": "1",
      "0x2ef885504FB8e9a88a35AB6Eb02C33Df69f0cc6d": "1",
      "0xBca57fF088Ac100D93Bd8C33f133Aa87eBB59190": "1",
      "0x9277D980419014F6E903Aff87641186EEF8FdE67": "1",
      "0xc2f8f0e33E8D2A6735fbEd260912f4fdE720e3D9": "1",
      "0x3F72B72B308755D653A3c66d1e99dFd0c7c3B116": "1",
      "0x0987d77b62e4d649F72a6896a94AdBa841A3238C": "1",
    };

    return [
      {
        name: "dentuso",
        timestamp: context.timestamp,
        description: "Data Group of the best traders i have ever met",
        specs: "Have a 100000$ pnl on your binance account every day",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
