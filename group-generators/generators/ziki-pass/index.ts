import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "ziki-pass",
        timestamp: context.timestamp,
        data: {
          "github:yum0e": 1,
          "github:Baoufa": 1,
          "github:CharlsCharls": 1,
          "github:dhadrien": 1,
          "github:gabin54": 1,
          "github:GrandSchtroumpf": 1,
          "github:jragosa": 1,
          "github:leosayous21": 1,
          "github:MartinGbz": 1,
          "github:nicolas-geniteau": 1,
          "twitter:f9s216": 1,
        },
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
