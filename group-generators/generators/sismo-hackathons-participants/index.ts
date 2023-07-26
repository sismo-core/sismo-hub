import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const builders = {
      "twitter:bianc8_eth": "1",
      "telegram:kprasch": "1",
      "twitter:arjanjohan": "1",
      "github:theref": "1",
      "github:meatballs": "1",
      "github:TheoLeFur": "1",
      "twitter:aiden_pearce04": "1",
      "github:L0GYKAL": "1",
      "github:AlbertoCentonze": "1",
      "twitter:lFinBob": "1",
      "twitter:NOOVHILS": "1",
      "github:kvncnls": "1",
      "twitter:CooperJamshed": "1",
      "twitter:grmkris": "1",
      "guilletala.eth": "1",
      "twitter:ChefShokumotsu": "1",
      "github:abdtimur": "1",
      "twitter:0xFrytos": "1",
      "twitter:andredbsc": "1",
      "twitter:Ushana34655283": "1",
      "github:raigal-r": "1",
      "github:Complexia": "1",
      "twitter:ammarif_": "1",
      "twitter:NelsonRodMar": "1",
      "twitter:guelowrd_": "1",
      "twitter:seanwbren": "1",
      "github:wannabehero": "1",
      "telegram:kaijuneer": "1",
      "twitter:vovunku": "1",
      "telegram:Jrastit": "1",
      "twitter:HUxwell_": "1",
      "github:taijusanagi": "1",
      "github:catmcgee": "1",
      "twitter:HxSimo": "1",
      "twitter:LGelinet": "1",
      "twitter:dydymoon1": "1",
      "github:nezz0746": "1",
      "github:Deepcryptodive": "1",
      "telegram:gaylordwarner": "1",
      "github:misirov": "1",
      "github:Deivitto": "1",
      "github:luksgrin": "1",
      "github:mmatteo23": "1",
      "github:0xCaso": "1",
      "telegram:slyracoon23": "1",
      "telegram:zpedro": "1",
      "github:wslyvh": "1",
      "twitter:piapark_eth": "1",
      "twitter:danimbrogno": "1",
      "twitter:devnull03": "1",
      "twitter:wired_hikari": "1",
      "github:monochrome9": "1",
      "github:BayramAnnakov": "1",
      "twitter:0xbyyou": "1",
      "telegram:ara11313": "1",
      "telegram:juliomcruz": "1",
      "github:Laser420": "1",
      "twitter:chimeraDefi": "1",
      "twitter:FishFishDeFi": "1",
      "twitter:liam_nft_96": "1",
      "twitter:hourglasshoro": "1",
      "twitter:takuya950413": "1",
      "twitter:0xTiff": "1",
      "twitter:vparv3": "1",
      "yogeshdarji.eth": "1",
      "github:kMongru": "1",
      "github:WiserRiser": "1",
      "twitter:rapchan": "1",
      "github:alexeipancratov": "1",
      "twitter:Eroica32": "1",
      "twitter:matthew_glezos": "1",
      "twitter:shubh_aga": "1",
      "twitter:WEBthe3rd": "1",
      "telegram:bonjour17": "1",
      "twitter:acolexyz": "1",
      "github:ChaskinOnChain": "1",
      "twitter:DicksonWuML": "1",
      "github:ottodevs": "1",
      "github:asyaasha": "1",
      "github:Lyons800": "1",
      "twitter:minchi_p": "1",
      "github:junggernaut": "1",
      "github:yedidromero": "1",
      "github:0xyNaMu": "1",
      "github:GigaHierz": "1",
      "github:spyglassventures ": "1",
      "twitter:giovannifulin": "1",
      "github:mDeisen ": "1",
      "github:rizoom ": "1",
      "github:anthonyissa": "1",
      "github:KRD-Kai": "1",
      "github:RafalZgoda": "1",
      "github:Nicoalz": "1",
      "github:MrPinut": "1",
      "github:brybalicious": "1",
      "github:bitspresso": "1",
      "github:smartcontracts": "1",
      "github:olenovyk": "1",
      "github:PaulineAnnBar": "1",
      "github:JulioMCruz": "1",
      "github:rutefig": "1",
      "github:Bluegales": "1",
      "github:lorbke": "1",
      "github:aderugy": "1",
      "github:Michael-Rousseau": "1",
      "github:bapt800": "1",
      "github:Jharaxus": "1",
      "github:Ryokog ": "1",
      "github:ramabouda": "1",
      "github:debuggingfuture": "1",
      "twitter:0xKate_web3": "1",
      "github:0xAdriaTorralba": "1",
      "github:Caruso33": "1",
      "github:normadn": "1",
      "github:0xWildhare": "1",
      "github:floberlin": "1",
      "github:zizou0x": "1",
      "github:tvinagre": "1",
      "github:louise-poole": "1",
      "github:carloszanella": "1",
      "github:xmazella": "1",
      "github:gskril": "1",
      "github:limone-eth": "1",
      "github:IdCom4": "1",
      "github:charlesjullien": "1",
      "twitter:Azioth_": "1",
      "github:DavNej": "1",
    };

    return [
      {
        name: "sismo-hackathons-participants",
        timestamp: context.timestamp,
        description: "Hackathons participants who built on Sismo",
        specs: "This group consist of all the hackers that built on Sismo during hackathons",
        data: builders,
        valueType: ValueType.Score,
        tags: [Tags.Builders],
      },
    ];
  },
};

export default generator;
