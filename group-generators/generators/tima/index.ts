
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
      "0xC76575340A8a3F567502A12f777b622a84475c9C": "1",
      "0xFd316932ef7B68681b7327A1F9f15CB45CC1C392": "1",
      "0x99A9aC561813E8813a34fcC5986e033D45517541": "1",
      "0x57A595f96e5b3385AD738481310A50B11F820e8D": "1",
      "0xfFEdc1aBb1E5aB8f18302e14D65e6Db5a2Ed7D68": "1",
      "0xB4502b9cEC75De13c8e9cc15B3afF00AFe7878E0": "1",
      "0x41d82123E311Ffd8B1b36B339319EADA8c35F8ac": "1",
      "0x26C62F8f656aa2a970e8Bb9Df90A43247bd96995": "1",
      "0x308ce0388D479FEeF77d88E112308144d04A1fa2": "1",
      "0x064Cfdd515e004d4E2095dE6CB831a49C2f23371": "1",
      "0xa8153083C4B8e7E631390E1Ba5F0f11f3aA18EC4": "1",
      "0xFbbaa9428c1545E44f8eEb32CA54255657281d9c": "1",
      "0x4e9369259D96B3aC201bEb66059E0757aACC18DD": "1",
      "0x9123087CC07aFA5d02F10f5b61DCB8D69DBD464D": "1",
      "0xd42aD672B48af741904658D14982f35Df37918F5": "1",
      "0xE16FA99d4662d377546bD627151dfC11f7baCDFb": "1",
      "0x60474dcCca0D21fF824D55e50140128CA5a5569f": "1",
      "0xaDEA9fcc12cD1223dd9BFC457a0Ae3cFE568ca18": "1",
      "0xDB92325e70A5F5c9be154f825Da0f6b172080D45": "1",
      "0x22356439B1596103A2a705999ECC4916122eD37E": "1",
      "0x282f783CD237f6D60003C5d4aFa2e46767920138": "1",
      "0x232bB4487B8B428197Dc8Fb9B0600126D89D182B": "1",
      "0x7a820C78F7d6618CF702024Bc9660fa057Be01d2": "1",
      "0x73daFA5e106cd4A205D7273802626adFbc1A6Dd9": "1",
      "0x6F511FEa9D1FDaDc49BbC4fB0CC22d81b172b44b": "1",
      "0xF5EadE1152579B97621D1733CF29cE81A8823a45": "1",
      "0x0a9dF5C9785BF1286654BE04231c8D917C156d4b": "1",
      "0x999dE7D0a7273b65d75E9F603DefD4E341546222": "1",
      "0xb6744132dAd48616d5F58856136b46de9905F547": "1",
      "0x41Fbb1A03cd5A703aB685e9582636d7612B8ab2E": "1",
      "0x26a2940224B7f22920FE49ba0eb360A5B0D0A57F": "1",
      "0xaA09E293b067BA02d28973C8a5968dE256eB19C3": "1",
      "0x60E250ae283FE4905046eBf2142fDc8C120E38f2": "1",
      "0xA5F162011368BC79a87F91cdE6A14B2DA6986f4C": "1",
      "0x0c45AE84e7E4a6ea76259750621C96929f653507": "1",
      "0x9E3469c15681e9AC26Af4A939cf49eB9c64a7537": "1",
      "0x5Bf8A55B4CB3ae997c67d3653E11149c934b46BE": "1",
      "0xfC582C0CEA81F8995452e2B68b24D2d03A05E156": "1",
      "0xfa933D65DfcE6b139cb3af9Ed6f4Dd7db0aE6310": "1",
      "0xA97923b2f39BA7259CB1C5Ba27e2A579502293d3": "1",
      "0x9082cC8E468c7F1bc90CCd8cAfBC3dB20F481F8d": "1",
      "0xE7b4face941dDEFe25bC1cCfe98427aB733F7f68": "1",
      "0x387174755ee68eE771dBD431DE4A7B5473eF06e9": "1",
      "0xd4D7e65Db75aae0DD840c99ef2B7eFbf14C7CAcD": "1",
      "0xD6f6cBAaDE668A4a784b24F21B87c3BDF9061D22": "1",
      "0xA11A020Bba0e0CdEA08829D23372dA5ac8e8a577": "1",
      "0x83eCC072d396752904BE7FE7F73553049273aa08": "1",
      "0x7C5D22D5601ab5DEa665E75Ff6DAa25e0d44F153": "1",
      "0x89F92047C382529edb6e1e5110673A47C2B78dd9": "1",
      "0xf877D6E25e18E1e94597C0ab9809B0a49cBB3526": "1",
    };

    return [
      {
        name: "tima",
        timestamp: context.timestamp,
        description: "Timofey users",
        specs: "Timofey top accounts traders",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
