
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0x91aB25c1D5717e6bf3F4DC54562de8D9706F1950": "1",
      "0x946FECe9a85a567D5554052e91823E7A4e889358": "1",
      "0x987BF9aE24f1C82B1E81E71443cfbe5D3CBda27e": "1",
      "0x4247066C3584FbD1b4A02051437361807CD8bB1C": "1",
      "0xc1AD8269AbCe8b8dC39a81eC5907Bda5c99710DD": "1",
      "0xBffBd24E2284cDf83f0fEdD464ee2A0C1a129F0d": "1",
      "0x384AACFd92Fa3f9Cf1DB1d76C39cbc9Df27020A3": "1",
      "0x9a058e053f44Dd3DF791f04C70f49F97fF2C9Ef3": "1",
      "0xfead30c282201C43Ebbd18CdE2E0FBe03c4B9956": "1",
      "0x0be3559E04cc011406058a42BDE11cB9c355F10B": "1",
      "0x1c71810C19d7261ebB77f9dFBC9713fccb804610": "1",
      "0xAf81E1D2497123836De0AE6ec62Ed08320483e3a": "1",
      "0xbEC21Df34574cb2E8dc0F82ed0aF893e07dE36f3": "1",
      "0x623448Ea4333802223DA12c729Ccc3D52B6a637B": "1",
      "0xA81500b04FCE8C2Bd27C1b57811C49b1b37feEE5": "1",
      "0x0Edf43Fe938BeDBBcd9F1eE554BfCDC6b820b355": "1",
      "0xc4c5709d99BB2b52d2b95CdD162f6833152D663e": "1",
      "0x9a97FcE6b96E590DCa58CaDba9f28bC365b9E908": "1",
      "0xDCA3a267889F3b89629515165060295f5Bc6CD40": "1",
      "0x864646DD942c48B8b4a875ad426722ab0399d9CF": "1",
      "0xC892ea756a0BA8fb70D2fb28e54f0Dc9980f348a": "1",
      "0xE23a9816D3b33e28e1667dc0E7C03105e6E67360": "1",
      "0x68398b87a200FEdFDFb4b6C2D1F598621DdDb7c0": "1",
      "0x9Cd960f1A69ca80d15bb248CCffa4Eb8a41BE0cD": "1",
      "0x10Bc451C0C103a4Eaf43bCCFe644261E2dEDF1fc": "1",
      "0x24c929711297ed717305231290059c3d3e1a0B01": "1",
      "0x2D675b3a175f077e62718BC0F7191D68248E40Cd": "1",
      "0xca47Cc8886ab1Cc147EA21ACC8c4598F7b7bE8D8": "1",
      "0x2F883ee633bc8b46d51673e8CCd732fD6C89ef69": "1",
      "0x6F9e4bbab9CdcC9dE6453E18FE7934c20588B2b5": "1",
      "0x0b163923Ef3ad74A60df4602c8D29Bc32494A0BC": "1",
      "0xa827D562Ce9912dDf5978752e8ED6C3b9d59A3F5": "1",
      "0x928d971AAfE080Dd0739Dc01edD7E6d87f485942": "1",
      "0x7Fc4b153E01884b1F4B497810B781543A2c4C205": "1",
      "0x66A6C792bE70507F4e840e50D2D683294F512Ec0": "1",
      "0x7E6B25368FA70E61A2092eeF62CaE77A61B1CC60": "1",
      "0xE1616A2Dd363c90fD21F1FEf2eb5E99bEc3751F4": "1",
      "0x6FCc02C7399A2Bdb827B829BC36b88eA292A1c18": "1",
      "0x7f9B8D22aA163B85702A1a52BA9f6d3a9F056C2c": "1",
      "0xdaE0EbdbCFBc342C955dA27382A725CEC10f57e6": "1",
      "0x962E4D1fE03e366240eB1e036419713707AbC2C3": "1",
    };

    return [
      {
        name: "op",
        timestamp: context.timestamp,
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
