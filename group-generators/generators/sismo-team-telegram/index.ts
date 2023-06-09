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
        name: "sismo-team-telegram",
        timestamp: context.timestamp,
        description: "Sismo team Telegram handles",
        specs: "",
        data: {
          "telegram:leo21_eth": "1",
          "telegram:dhadrien": "1",
          "telegram:dimsome": "1",
          "telegram:bigq11": "1",
          "telegram:Gabinhs": "1",
          "telegram:kugusha_0x": "1",
          "telegram:quentinf67": "1",
          "telegram:charls_charls": "1",
          "telegram:MartinGbz": "1",
          "telegram:baoufa": "1",
          "telegram:bettina_bf": "1",
          "telegram:pelealexandru": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;