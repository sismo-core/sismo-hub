
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
      "0xe47cadbc6a640a46f45733d7d6e426401caf771b": "8",
      "0xffbcd0acd31dc273199e875692643f313025a0ff": "7",
      "0x9beed79cd9253db95f3a41381bceade66a345311": "7",
      "0x9caf735b835a9a5740f48d83edc3c8f36308b0fa": "8",
      "0x797ee0e4aa967bdeafe25dbe00b82688a9e3f769": "7",
      "0x2211fce76ad56e9aa19598064d02c2a8e5c3a0ce": "7",
      "0xd462c4fd0dd6c1f3ae39303dd96c915000c9e209": "8",
      "0xa277e09699e25fec6f4b14f7b176d48058e13201": "8",
      "0xb26833da62fd312dce59c0dec5e242d12fd511ee": "8",
      "0xc9927646e7a4715ae4a8b1f39d25136a2c8dde2f": "8",
      "0x6d5954356d5f8320605631b7794dddfc18cb7485": "7",
      "0x7e985d3ca90ad4f6e9dea9b366d97936be463fbd": "7",
      "0xbb54e10b7fd77f5438a5fff219f0188cbd04298d": "7",
      "0xd130cc3653ea2fe7737ad2905a93eafda16734bc": "6",
      "0x6ff1f31fb860c51b21ed0114d22dcee45c06fcf1": "7",
      "0x9fb550fa9159550e756e30dd31a1ca0a3ad11b02": "8",
      "0xfb63d6c694cc23f4f3f6eba1b8a66fefde35a867": "8",
      "0xe3cb1be327a91f01b952bbcd0f7208704e888bf1": "7",
      "0x5cbefd9e86b585155af871b17d128491bf5e8143": "7",
      "0x371de435a6759edbd896ea400814b59dd47e9460": "7",
      "0x761cb6e885555124cfa99f23c27094eb0a21e6fe": "8",
      "0x2c0b3ba2548b9a63a9f0bc5320a3dccbd6ac82e0": "8",
      "0xe9e7206e8751ec323660b42ef061408ad1dc0cd9": "6",
      "0xde0afa9a9bcfaf5dbee613c6dd5e26e1b968ff20": "7",
      "0xafe69b0455564786e54d34f5a268eaf7edfad7d9": "8",
    };

    return [
      {
        name: "test2",
        timestamp: context.timestamp,
        description: "test2",
        specs: "teset2",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
