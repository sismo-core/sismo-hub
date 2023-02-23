
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
      "0xD257d0147cd3d099790356aaCf0bBEcBC01d7AAa": "1",
      "0x7e9483dDFeC009d9a66F693b2FA09FcefCa9bBab": "1",
      "0x6C331b963232B0eE2A0a024B3775C6800819BdaC": "1",
      "0x31D83E70f8523675328D1CC488Cdc53E0839b723": "1",
      "0xBee58D4dF6417470f8a00DdCFe718708c566bBe0": "1",
      "0xae2305Fa4dd1F43d63bFD05A6F3Cc1d337aC5F86": "1",
      "0x89C8C760Aa12aa3B6AeE65d81E802F449E9d856a": "1",
      "0x9d7cA26ff66B626Dd92eF417D14552C429A18a3c": "1",
      "0xE40650a85E84Dd62e80B8B76c8abe7b98F396A2a": "1",
      "0xA70D2B727bc281F10F3B603286D94eF637b5b167": "1",
      "0x2E357B3b20fb30dCDa2B4DE48a17cC3261403E16": "1",
      "0xDDf48f62E07C2E9f689AE903255D090E9Bb9D725": "1",
      "0x334FF7580eE92bb13D744cd309925560877122a1": "1",
      "0x8de8bD3B27932eeDdcdb354CCa625fE3dB491E54": "1",
      "0x0F465F7ce5a1e26C402177194653c12e7222F127": "1",
    };

    return [
      {
        name: "unumdao",
        timestamp: context.timestamp,
        description: "Contributed at least 0.1 ETH privately to the ConstitutionDAO 2 campaign",
        specs: "Contributed at least 0.1 ETH privately using Nucleo to the ConstitutionDAO 2 campaign and opted for continuing on the UnumDAO mission of using democratizing Web3 technologies to govern and manage historically significant civic artifacts tracking the progress of democracy.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
