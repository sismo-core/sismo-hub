
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
      "0xBf022B19A5D389b0129Bc6D0856051aD4838f986": "1",
      "0xa343330F1E2848f02D09AD0F197be4F75ecdfb3c": "1",
      "0xd95417AA3023043931328D5A3BAA6Afd80379510": "1",
      "0x0229a3d4faB214ac8aE4FE6a5Bb1b7279592aC9D": "1",
      "0x4060c69936E04075DC6170c4D5b1fe3e35A4BaAB": "1",
      "0xc3f7DeBF793001d97bADbD056E038fC5d9424689": "1",
      "0xd0be5393d1a423e2761225CaBB62A6Fa81D5FDc0": "1",
      "0x646E3BD22B9D2C40De855Dc467af1528307Ae4D5": "1",
      "0xB54dEfAd873c1dF316fD61d0ED85974585C11795": "1",
      "0xfC4539dD9Da671277B11F4961cF40070d12868DC": "1",
      "0xD4648aFa05071c7e2c3E74e64B017Bf0291Be3a6": "1",
      "0xC0Aac4eC8335D78Dd049ec5d99178106D7d654fc": "1",
      "0x6B47a326f049F0C7C7666f05631106DaF967d64f": "1",
      "0x6bB9e127E0a68F1644a873208097258157baE49D": "1",
      "0xce05AfB7D8Ed51a162964a1beb1d13CBCF31e91E": "1",
      "0x427BA75Ad72f87064151155dF42aeb00e66C85cC": "1",
      "0xad9D364C6662D480b2Aff4dEB53e80a1669C9640": "1",
    };

    return [
      {
        name: "saveasart",
        timestamp: context.timestamp,
        description: "people who love and bought generated NFT from @saveasART",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
