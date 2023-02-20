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
    return [
      {
        name: "hazae41-github-followers",
        timestamp: context.timestamp,
        description: "Follow @hazae41 on GitHub",
        specs: "Follow @hazae41 on GitHub",
        data: {
          "github:GuillaumeBibaut": "1",
          "github:lambdalisue": "1",
          "github:Efreak": "1",
          "github:IGUNUBLUE": "1",
          "github:marwanhilmi": "1",
          "github:jakepurple13": "1",
          "github:PratikDhanave": "1",
          "github:shamilovtim": "1",
          "github:estrattonbailey": "1",
          "github:amanpurohit": "1",
          "github:qs-lll": "1",
          "github:camdenorrb": "1",
          "github:Danw33": "1",
          "github:jwne": "1",
          "github:maxamin": "1",
          "github:nikitavoloboev": "1",
          "github:gamemann": "1",
          "github:andronov04": "1",
          "github:vivekweb2013": "1",
          "github:ericlery": "1",
          "github:andyvandy": "1",
          "github:samkoba": "1",
          "github:Valyrox": "1",
          "github:sahwar": "1",
          "github:dplewis": "1",
          "github:tomocrafter": "1",
          "github:Jak7774": "1",
          "github:albanezo": "1",
          "github:Gabitzuu": "1",
          "github:brandon-schabel": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
