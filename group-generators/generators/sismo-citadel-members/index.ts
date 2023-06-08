
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const members = {
      "telegram:kprasch":"1",
      "telegram:theref_eth":"1",
      "telegram:owencampbell":"1",
      "telegram:theolefur":"1",
      "telegram:AidEn_PeArce0":"1",
      "telegram:L0GYKAL":"1",
      "telegram:alberto_centonze":"1",
      "telegram:Patrickous":"1",
      "telegram:kvncnls":"1",
      "telegram:lolchto":"1",
      "telegram:rraigal":"1",
      "telegram:remicase":"1",
      "telegram:quiker":"1",
      "telegram:taijusanagi":"1",
      "telegram:catmcgee":"1",
      "telegram:deepcryptodive":"1",
      "telegram:slyracoon23":"1",
      "telegram:developerSec":"1",
      "telegram:AnotherDaveOk":"1",
      "telegram:luksgrin":"1",
      "telegram:barbour93":"1",
      "telegram:frayeX":"1",
      "telegram:casocasocaso":"1",
      "telegram:emilianobonassi":"1",
      "telegram:cesarhuret":"1",
      "telegram:Afkbyte":"1",
      "telegram:christianholman":"1",
      "telegram:wslyvh":"1",
      "telegram:gabrielaxyy":"1",
      "telegram:tiagofneto":"1",
      "telegram:jpldcarvalho":"1",
      "telegram:d0x471b":"1",
      "telegram:change_000":"1",
      "telegram:MatteoMer":"1",
      "telegram:wojtekwtf":"1",
      "telgram:LouisGrx":"1",
      "telegram:cryptograthor":"1",
      "telegram:demivoleegaston":"1",
      "telegram:sampolgar":"1",
      "telegram:dcbuild3r":"1",
      "telegram:OspreyFramework":"1",
    };

    return [
      {
        name: "sismo-citadel-members",
        timestamp: context.timestamp,
        description: "Sismo Citadel Members",
        specs: "This Group consists of all hackathon bounty winners and friends of Sismo",
        data: members,
        valueType: ValueType.Score,
        tags: [Tags.Builders, Tags.Telegram],
      },
    ];
  },
};

export default generator;
