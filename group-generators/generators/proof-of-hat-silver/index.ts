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
            "0x03cbdf8bfb83278715808c388d230dd7534e1039": 1,
            "0x08a6a0da774798e67c4dbf1fefb0dfdf19198f2a": 1,
            "0x24aad1124fe2da0c705005af241c676b0e900af4": 1,
            "0x304754ee569e668eaa085df6b7bdebb33941e8ba": 1,
            "0x3381d8b1eab14d676a32be4d7098f4abe63bb6aa": 1,
            "0x381277e1ae97125484a598415ac68e36bf75d912": 1,
            "0x3f519049b3f44b37ff0bd83c011f95cacf91b52d": 1,
            "0x41ea85211c08227bd62b03f3efc65faaa6cbd1c3": 1,
            "0x4934b900fc9556d7d651d3a7274d9971b4d15989": 1,
            "0x4e7a4d2b926832634271955d0d5cd7af8f182257": 1,
            "0x544239190fd872e0b81d02b04d64719d99ced9d2": 1,
            "0x569eab3c91828b7d9f951d335bc12a6aabec1458": 1,
            "0x6299ae631d7436013e03088f9ee5d5e53d804964": 1,
            "0x65bf5577fe54005297cb73a5c22e251c13d208c1": 1,
            "0x712430de41373601ac8d0fe7cac98934415e1223": 1,
            "0x78d04e04ecbbedab36e0f54a282fe8a589e96bdd": 1,
            "0x7a2e1f7792ff25637aa3f0e727072e3a821695e9": 1,
            "0x8dd5c04fc5c6e13ce74691aa4f64527cd8b9feb1": 1,
            "0x8deaf66d5fdfeeda84bb6793aaa960976198570b": 1,
            "0x9b8a5f83eef37c600c3cdac908cd59a443477397": 1,
            "0xa1b04c9cbb449d13c4fc29c7e6be1f810e6f35e9": 1,
            "0xaaa7fee28e9ec52cb56f734be29f239cffc6e5bc": 1,
            "0xad9fbd38281f615e7df3def2aad18935a9e0ffee": 1,
            "0xb02a0f01407845876a911803d10d7943b2520b05": 1,
            "0xc11d0d9e1e6c16ea5e5395e0129ca34262ca2315": 1,
            "0xc331046820ef6d011141c1c7f0f6c76cbaf46413": 1,
            "0xcdb6b6f3fef940073f0ea4e6fb9791c25fd909ba": 1,
            "0xda9d8641049bb83c6bf2bf07d8fdfa9f48974663": 1,
            "0xe26b8384d946747e8548c87f8f7b000a29e6092e": 1,
            "0xe5e482cf5f84b7278dd015f5ada98c2bfc4b7bfe": 1,
            "0xe7320e016230f0e8aa3b5f22895fc49dc101c2cb": 1,
            "0xea1d35b564307a99308e6c5b2b7a2b82ff3a694b": 1,
            "0xffede18d0eaacfff56b64ebe58a7289d10bb0c5b": 1
            },
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
