import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// This is the local group to experiment freely on a local env
// You can add your address in any Pull Request if you wish

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "local-group",
        timestamp: context.timestamp,
        description: "Local group to experiment freely on a local env",
        specs: "You can add your address to this group during the tutorial if you want to be eligible",
        // value should be thought as "tier"
        // and suit a particular usecase
        data: {
          "0xa1b073d5503a27DFBA337cFdb8458b71B3359c74": 1,
          "0x025dbf373fe82fa4873b238863ea0d0d2c3fe0d5": 1,
          "0x0267a0881e6f745c9f25f269c20d5d7c5c044f37": 1,
          "0x026815624ac76c88ac92ab490035dc539558275d": 1,
          "0x0271cf50b7ed33e32beea6c4960a90a909128236": 1,
          "0x027434e6aaa10441ad91ff132a324b4da88e5810": 1,
          "0x027850ca1d9f3435cfe2cac439242f63485c5616": 1,
          "0x027b2fdf7b0793679acde003a5e22e17a4803fed": 1,
          "0x02af5e91525e8f0d47cd8c676209ec0033294a95": 1,
          "0x02b04fd27fb898e6face6df1888f72906b5ba11c": 1,
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
