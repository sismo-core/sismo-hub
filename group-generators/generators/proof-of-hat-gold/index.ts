import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "proof-of-hat-bronze",
        timestamp: context.timestamp,
        data: {
          "0x0c6daada05880228dba053d9552c96cd44bb5baf": 1,
          "0x19d545f7e9e26a1c3cb22caa73dbddde1ddd80da": 1,
          "0x24265a332a2a8844835279b3970462c5904e3a7c": 1,
          "0x24aad1124fe2da0c705005af241c676b0e900af4": 1,
          "0x3a6acb9245de23de91c3de06726d4db90d2f3b10": 1,
          "0x3f519049b3f44b37ff0bd83c011f95cacf91b52d": 1,
          "0x4083da6393cdcd5097a802402fa1d7132a2f79af": 1,
          "0x411c16b4688093c81db91e192aeb5945dca6b785": 1,
          "0x41ea85211c08227bd62b03f3efc65faaa6cbd1c3": 1,
          "0x4e7a4d2b926832634271955d0d5cd7af8f182257": 1,
          "0x6211202610cd9e392b84a7e2b68ec0919e71ea1f": 1,
          "0x6299ae631d7436013e03088f9ee5d5e53d804964": 1,
          "0x65bf5577fe54005297cb73a5c22e251c13d208c1": 1,
          "0x6820e97b5a81b9fbc972350cac7a281bd572d991": 1,
          "0x75e480db528101a381ce68544611c169ad7eb342": 1,
          "0x7a2e1f7792ff25637aa3f0e727072e3a821695e9": 1,
          "0x8deaf66d5fdfeeda84bb6793aaa960976198570b": 1,
          "0x8f5aa4bd9ac1a830e8210b88147c85c61466bae8": 1,
          "0x95c52bcbe956a4bc6f454b49d9b010a18b08f1c7": 1,
          "0xa1b04c9cbb449d13c4fc29c7e6be1f810e6f35e9": 1,
          "0xaa507b16081d5f79a4bc82bb8df143cb5c5c67a5": 1,
          "0xacbce3e3e5df14b0f9d493d9273bbfac5ce4d386": 1,
          "0xb02a0f01407845876a911803d10d7943b2520b05": 1,
          "0xbc2ee33c802dcc5e817afffaf4fa2388b6cdadec": 1,
          "0xc11d0d9e1e6c16ea5e5395e0129ca34262ca2315": 1,
          "0xcbcf3f93e37f51d0bd56cc6c925f90d9c98f0f1a": 1,
          "0xd8eddd4e1da319620f00c6b0ae2af35c2e7f1a6b": 1,
          "0xde421db35ef9946057c773ab12562ecedb0fe388": 1,
          "0xea1d35b564307a99308e6c5b2b7a2b82ff3a694b": 1,
          "0xf5b88d9161d8810a840392fe05deb17000caedeb": 1,
          "0xf7974591d54d7c83351061e7bdb801e997f6e01d": 1,
        },
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
