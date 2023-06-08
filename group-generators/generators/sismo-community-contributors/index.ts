
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const contributors = {
      "twitter:CamelNotes":"1",
      "twitter:haphapovich":"1",
      "twitter:1_ixela":"1",
      "github:sampolgar":"1",
      "twitter:FINE8385":"1",
      "twitter:rkumar021219":"1",
      "twitter:deepcryptodive":"1",
      "github:AdamSchinzel":"1",
      "github:mme022":"1",
      "telegram:LouisGrx":"1",
      "telegram:gwentg":"1",
    };

    return [
      {
        name: "sismo-community-contributors",
        timestamp: context.timestamp,
        description: "Sismo Community Active members",
        specs: "This Group consist of active community members and non-tech contributors",
        data: contributors,
        valueType: ValueType.Score,
        tags: [Tags.Builders, Tags.Twitter, Tags.Github, Tags.Telegram],
      },
    ];
  },
};

export default generator;
