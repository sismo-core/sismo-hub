import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
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
        name: "ofac-chads-zk-badge-08-08-2022",
        timestamp: context.timestamp,
        description: "Own an address added to OFAC's SDN List on 08/08/2022",
        specs: "Own one of the addresses added to OFAC's SDN List on 08/08/2022. See https://home.treasury.gov/policy-issues/financial-sanctions/recent-actions/20220808.",
        data: {
          "0x8589427373D6D84E98730D7795D8f6f8731FDA16": "1",
          "0x722122dF12D4e14e13Ac3b6895a86e84145b6967": "1",
          "0xDD4c48C0B24039969fC16D1cdF626eaB821d3384": "1",
          "0xd90e2f925DA726b50C4Ed8D0Fb90Ad053324F31b": "1",
          "0xd96f2B1c14Db8458374d9Aca76E26c3D18364307": "1",
          "0x4736dCf1b7A3d580672CcE6E7c65cd5cc9cFBa9D": "1",
          "0xD4B88Df4D29F5CedD6857912842cff3b20C8Cfa3": "1",
          "0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF": "1",
          "0xA160cdAB225685dA1d56aa342Ad8841c3b53f291": "1",
          "0xFD8610d20aA15b7B2E3Be39B396a1bC3516c7144": "1",
          "0xF60dD140cFf0706bAE9Cd734Ac3ae76AD9eBC32A": "1",
          "0x22aaA7720ddd5388A3c0A3333430953C68f1849b": "1",
          "0xBA214C1c1928a32Bffe790263E38B4Af9bFCD659": "1",
          "0xb1C8094B234DcE6e03f10a5b673c1d8C69739A00": "1",
          "0x527653eA119F3E6a1F5BD18fbF4714081D7B31ce": "1",
          "0x58E8dCC13BE9780fC42E8723D8EaD4CF46943dF2": "1",
          "0xD691F27f38B395864Ea86CfC7253969B409c362d": "1",
          "0xaEaaC358560e11f52454D997AAFF2c5731B6f8a6": "1",
          "0x1356c899D8C9467C7f71C195612F8A395aBf2f0a": "1",
          "0xA60C772958a3eD56c1F15dD055bA37AC8e523a0D": "1",
          "0x169AD27A470D064DEDE56a2D3ff727986b15D52B": "1",
          "0x0836222F2B2B24A3F36f98668Ed8F0B38D1a872f": "1",
          "0xF67721A2D8F736E75a49FdD7FAd2e31D8676542a": "1",
          "0x9AD122c22B14202B4490eDAf288FDb3C7cb3ff5E": "1",
          "0x905b63Fff465B9fFBF41DeA908CEb12478ec7601": "1",
          "0x07687e702b410Fa43f4cB4Af7FA097918ffD2730": "1",
          "0x94A1B5CdB22c43faab4AbEb5c74999895464Ddaf": "1",
          "0xb541fc07bC7619fD4062A54d96268525cBC6FfEF": "1",
          "0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc": "1",
          "0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936": "1",
          "0x23773E65ed146A459791799d01336DB287f25334": "1",
          "0xD21be7248e0197Ee08E0c20D4a96DEBdaC3D20Af": "1",
          "0x610B717796ad172B316836AC95a2ffad065CeaB4": "1",
          "0x178169B423a011fff22B9e3F3abeA13414dDD0F1": "1",
          "0xbB93e510BbCD0B7beb5A853875f9eC60275CF498": "1",
          "0x2717c5e28cf931547B621a5dddb772Ab6A35B701": "1",
          "0x03893a7c7463AE47D46bc7f091665f1893656003": "1",
          "0xCa0840578f57fE71599D29375e16783424023357": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
