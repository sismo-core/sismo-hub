
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const builders = {
      "telegram:change_000":"1",
      "telegram:developerSec":"1",
      "telegram:AnotherDaveOk":"1",
      "telegram:luksgrin":"1",
      "telegram:frayeX":"1",
      "telegram:casocasocaso":"1",
      "telegram:wslyvh":"1",
      "twitter:bianc8_eth":"1",
      "telegram:kprasch":"1",
      "twitter:arjanjohan":"1",
      "telegram:theref_eth":"1",
      "telegram:owencampbell":"1",
      "telegram:theolefur":"1",
      "telegram:AidEn_PeArce0":"1",
      "telegram:L0GYKAL":"1",
      "telegram:alberto_centonze":"1",
      "twitter:lFinBob":"1",
      "telegram:Patrickous":"1",
      "telegram:kvncnls":"1",
      "twitter:CooperJamshed":"1",
      "telegram:gaylordwarner":"1",
      "twitter:_gkris":"1",
      "twitter:GuillermoTala":"1",
      "twitter:chefshokumotsu":"1",
      "telegram:lolchto":"1",
      "twitter:0xFrytos":"1",
      "twitter:andredbsc":"1",
      "twitter:Ushana34655283":"1",
      "telegram:rraigal":"1",
      "telegram:remicase":"1",
      "twitter:ammarif_":"1",
      "twitter:NelsonRodMar":"1",
      "twitter:guelowrd_":"1",
      "twitter:seanwbren":"1",
      "telegram:quiker":"1",
      "telegram:kaijuneer":"1",
      "twitter:vovunku":"1",
      "telegram:Jrastit":"1",
      "twitter:huxwell_":"1",
      "telegram:taijusanagi":"1",
      "telegram:catmcgee":"1",
      "twitter:HxSimo":"1",
      "twitter:LGelinet":"1",
      "twitter:dydymoon1":"1",
      "twitter:nezzRX":"1",
      "telegram:deepcryptodive":"1",
      "twitter:zpedro_eth":"1",
    };

    return [
      {
        name: "sismo-hackathons-participants",
        timestamp: context.timestamp,
        description: "Hackathons participants who built on Sismo",
        specs: "This group consist of all the hackers that built on Sismo during hackathons",
        data: builders,
        valueType: ValueType.Score,
        tags: [Tags.Builders, Tags.Twitter, Tags.Github, Tags.Telegram],
      },
    ];
  },
};

export default generator;
