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
            "0x0085560b24769dac4ed057f1b2ae40746aa9aab6": 1,
            "0x0294350d7cf2c145446358b6461c1610927b3a87": 1,
            "0x0783094aadfb8ae9915fd712d28664c8d7d26afa": 1,
            "0x080b65a5c4dc645f48122cf6d340e2ab655805ca": 1,
            "0x0cb94a2697e11950fb26f2094e5ce478e26b1df4": 1,
            "0x20600045bd98fab57497685741f5c51da3d1ed6c": 1,
            "0x24aad1124fe2da0c705005af241c676b0e900af4": 1,
            "0x2aff5ba9dfac5ed8df4c508bd988bc22991760d3": 1,
            "0x304754ee569e668eaa085df6b7bdebb33941e8ba": 1,
            "0x3e23d7b2726ae215a2d6fe6dbbba2665173feafb": 1,
            "0x3eb26aad1754ac1306dc5245eec618f8ad75bfff": 1,
            "0x41ea85211c08227bd62b03f3efc65faaa6cbd1c3": 1,
            "0x4934b900fc9556d7d651d3a7274d9971b4d15989": 1,
            "0x4e7a4d2b926832634271955d0d5cd7af8f182257": 1,
            "0x4f9c798553d207536b79e886b54f169264a7a155": 1,
            "0x544239190fd872e0b81d02b04d64719d99ced9d2": 1,
            "0x6211202610cd9e392b84a7e2b68ec0919e71ea1f": 1,
            "0x6299ae631d7436013e03088f9ee5d5e53d804964": 1,
            "0x75e480db528101a381ce68544611c169ad7eb342": 1,
            "0x787422b5167d4d1fad0179720f5159423a0a88bc": 1,
            "0x7f43464e88975385d506d734428810aa61cc7eb6": 1,
            "0x8bffc896d42f07776561a5814d6e4240950d6d3a": 1,
            "0x8dd5c04fc5c6e13ce74691aa4f64527cd8b9feb1": 1,
            "0x8f17462a92de8f674a7d0e467ce0bcdd8ff30623": 1,
            "0x8f5aa4bd9ac1a830e8210b88147c85c61466bae8": 1,
            "0x97c5fcf69ff6d05aaacf407f9cf356119e511979": 1,
            "0x9b8a5f83eef37c600c3cdac908cd59a443477397": 1,
            "0x9cc4384eacc96be3d5094471bd2a9479b0c88bc1": 1,
            "0xa1b04c9cbb449d13c4fc29c7e6be1f810e6f35e9": 1,
            "0xa76f290c490c70f2d816d286efe47fd64a35800b": 1,
            "0xacbce3e3e5df14b0f9d493d9273bbfac5ce4d386": 1,
            "0xad9fbd38281f615e7df3def2aad18935a9e0ffee": 1,
            "0xb02a0f01407845876a911803d10d7943b2520b05": 1,
            "0xb7657ecbd7bc8270b8e1c9bf7751a3ece44a81c6": 1,
            "0xc331046820ef6d011141c1c7f0f6c76cbaf46413": 1,
            "0xc9293d2a1de514c16c8b87ee69225412e95a266c": 1,
            "0xcbcf3f93e37f51d0bd56cc6c925f90d9c98f0f1a": 1,
            "0xd8eddd4e1da319620f00c6b0ae2af35c2e7f1a6b": 1,
            "0xe7320e016230f0e8aa3b5f22895fc49dc101c2cb": 1,
            "0xe860947813c207abf9bf6722c49cda515d24971a": 1,
            "0xea1d35b564307a99308e6c5b2b7a2b82ff3a694b": 1,
            "0xec8748f37edf7abe63cd198b495a61f4398f7370": 1,
            "0xf2cc3e916bf81c903ef846fbc5841d83636f74ca": 1,
            "0xf7974591d54d7c83351061e7bdb801e997f6e01d": 1,
            "0xfd247ff5380d7da60e9018d1d29d529664839af2": 1
            },
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
