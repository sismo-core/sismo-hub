
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
      "0xf3dEbB856370aA87823c083be43713Ba526b75E8": "1",
      "0x799F768Dfb8F3BbcD24fAD9f1C98364B3883e785": "1",
      "0x16A28b2826d407aD876D84cC68A3f0C3a6d12F8C": "1",
      "0x370E102DecCf8b23FE25A1C4e9193c4c2bBCb000": "1",
      "0x3de5BBE385d6EDB18F691017b749a02C65C86ba8": "1",
      "0x5985C0518dc4B5b22D5556612391241d3228C106": "1",
      "0x6aE7c1f2D5189a01FE4972f360B9C438B82EB5f1": "1",
      "0x8415EDe56f29cc0c5049Ac20F88f2cF6e41db53b": "1",
      "0xCC34890cEBF3C47a4985Cb3A460Ce313C5783C78": "1",
      "0x499eB561220eb358CcBc5a72d4cDD4F5b76A2d2A": "1",
      "0x0E268132D4C66BFda20F91FF91B676B5228eE011": "1",
      "0xa2873a89a7e6d4EBBae2504b7d83013aD56BA7B0": "1",
      "0x3a9366171FcbA4Ea51C353B8e1771C0284660bC2": "1",
      "0xeB765B7393e95D13aFb35568Fe5bb08d60bD6a40": "1",
      "0x9B29234a382c6a41e348e57D24dfB3803E32b220": "1",
      "0x2d9ccebB608eB0D85499D9d98f76CeD22f06d945": "1",
      "0x98E3eedFDa69C2BD197e48fa08C2835f9c7516C9": "1",
      "0xb2801900fb83990284f394ae48182602c3c7fc51": "1",
      "0xa0aecc4a848e6f9998216e004a90b61c810febec": "1",
      "0xd177Fe30b51f03011EDF47FaeA1DaEA8B146e448": "1",
      "0xCAd0800EDcc3b3AC9f875d023508b403b1bD8330": "1",
      "0x0C0E18A498898b48C6F98c56f36874c163Ef55F8": "1",
      "0x6fac55a62e1ab1459eb28b431ea01d7367159e60": "1",
      "0x62F046b7AEBee3f53B652069b89d5B129A5d99A4": "1",
      "0xa918aAbF6152B56b97841749Aafa1B718A1b931F": "1",
      "0x51450437065D26F96dDad04b2ae5A453fa570DdB": "1",
      "0x205D90BF50bF9Be24815D921f7af101A90F89597": "1",
      "0xe14C1D23d6a787bb8756E300732Df9C3922c552d": "1",
      "0x548F0f0fc8e59E5121b2f71e7c18427aB41008Fe": "1",
      "0xC3E394DC5562480D81ADf5EC4E5f644D4388da5C": "1",
      "0x62ab8DC662f9249fF101352ef68F90cC7C1b27cb": "1",
      "0xB1ba236aC924C0064Bf69d5a21c062839aAd8ba2": "1",
      "0x8c7bAaCa6709e083fA80F51AD7AC6F07cC1ED92e": "1",
      "0x299D986118086BF3D9c7Ba251a3044b83bb1C397": "1",
      "0xe0D9B72CB87adCCC5072e81f718747c6355318bf": "1",
      "0x3A8db3618f941CcD8ff70A38e2402c5d43513806": "1",
    };

    return [
      {
        name: "tuleep-drop",
        timestamp: context.timestamp,
        description: "Data group of Tuleep merch drop",
        specs: "Tuleep best users",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
