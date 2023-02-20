
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
      "0xF4F31Cd6bf67e418d2ca705280A402f6B9313AA9": "1",
      "0x65Fd0e69886dceE853A68a34004F8aD17906B2f2": "1",
      "0x60A34e1800c1013E074969Eb45D0BB3409E0Eb9A": "1",
      "0x011E08D18f7aA71607fb142eB9BEB0BeD0B0121D": "1",
      "0x65aF4F1ff2db5f6a82190a73C246a6f09cA0FD71": "1",
      "0x1d3CDa3116F9B022BaB0bAF6c810dcE30E48B9a7": "1",
      "0xab9ec876f000a253372a803A3eD6b701b995c20d": "1",
      "0xd570b6B482a5f74BEA7BB00A0c0Dcd7cb964D1e8": "1",
      "0xEd0A4FdBB8D54e43B99dE006D2161BeC751ADb47": "1",
      "0xAAA9c62EfE719df7fC36C81592eb10139b185904": "1",
      "0xcE7a82d0fDF3abEdaCB7183C02Ec1731b6cb4100": "1",
      "0xD6BC830B54121971C705f458981De2a1f9A24d28": "1",
      "0x46309c8Ad7e72aDcCD0c384b8A5Dc1B576fcD868": "1",
      "0x95bD3E91c0faad3C27DAC9AE9d4523ce426A860F": "1",
      "0xfC4c510c668830E456FFbA45593950b00e919299": "1",
      "0xCf0f5643f85d5EEec53F262F9C2C55472d705542": "1",
      "0x1D35b54756A8A55d01757FCB98aC9ACe5224c047": "1",
      "0x3353c734506F4412Ff87429982091D36deb036d1": "1",
      "0xb90AafFc9798E6F06904194DDb089cf96FD7178d": "1",
      "0xdfa33baB7a07f7F49832f273209Aff538c4a0075": "1",
      "0x0b55921A2DD903cC7180A700FD7948bE67B065B2": "1",
      "0x921a44041d1A7A7E6e56d90E07eA46d25572fA06": "1",
      "0xd338321B4fD51297Ee2716aDDfF26C14d3EfedD2": "1",
      "0xa8D896831c6EB5e3d11dC6ae2A4072D1b7DaA583": "1",
      "0xc95E2D8B29A52234EdDBA7f0Bf344A58C4226fC7": "1",
      "0x4836963f420B7C031002C54935051e0ccc6775dF": "1",
      "0x77A0f9d0A4D0Bf1791C63668D7CC47C47FC5C422": "1",
      "0xBB7A20F6d47D870193Fe80E3dF6777c7362D49Df": "1",
      "0x3f7B138Db73B9754c48581DF2B39416B67C54961": "1",
      "0x964D142f4F69166183c4B7720D88773ec533aF95": "1",
      "0x7c55042084b4F5F58D80B11c7660BadE52C1A88E": "1",
      "0xCB08F7785DB2510212d0035c6f7df8eb28245a60": "1",
      "0x62c5c167209aF1F065f4030c2eCf1a8168B04EEe": "1",
      "0xD9644164118B5032E65120DddDc570626e5439f7": "1",
      "0x510972A4B59D6f131114b2FD0238633FFb1b2867": "1",
      "0x1485eB450A1E34B8473Bb94e59a1B55102A4aF9F": "1",
      "0x0A23072a1f20357e81fbc2343fCCaC38A222344b": "1",
      "0x7cfb2833D48B2bbA53Bb27e544315e705cC31395": "1",
      "0x021c431B764D93340b53e58995181523a48170d0": "1",
      "0x792E88e04888eC142B667A27510a9d810A214502": "1",
      "0x72007e861601f1Fc37b153f2B089E8537Aa554AC": "1",
      "0x5270e28EDd312BF89CAFD08931ddff41526B2Bf2": "1",
      "0x02e1f6B10C3170b42C909A3ed2a7669F315A733a": "1",
      "0x727898bF7c476CCe1A6F01B46377Eb795ebD71c3": "1",
      "0xC8DB6D8C872681FB5EdF8fc6803694F790c47734": "1",
      "0x97F374A568a7216d9aCDFC3bB4C56db8C79c409c": "1",
      "0xAa50b02689a3E63cbb1FFc25B6734F96B4d9f763": "1",
      "0x36C9eCB8E1ABF1e04A6b68081FB4cC99f757B166": "1",
      "0x2635773354F4712B3114EE89d94D8422a6a1130A": "1",
      "0x3ef3896EEEf7665D6119768D846F535f55B20a31": "1",
    };

    return [
      {
        name: "swapper-armyfox",
        timestamp: context.timestamp,
        description: "1 transaction during armyfox period",
        specs: "1 play in Armyfox gaming",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
