import { gql } from "graphql-request";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  FetchedData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const dataProfiles: FetchedData = {};

  const ensNames : string[] = ["treysongz.eth", "davidsiwonchoi.eth", "laurdiy.eth", "mariobautista.eth",
        "rayito.eth", "drakebell.eth", "vitalik.eth", "mariogotze.eth", "erigga.eth", "puma.eth", "wakaflocka.eth", "bored.eth", "tacha.eth", "anatii.eth", "mrpigmx.eth", "barmstrong.eth", "bunb.eth", "garyo.eth", "ahopkins.eth", "anitahassanandani.eth", "cdixon.eth", "bmf.eth", "yourhighness.eth", "krls.eth", "filipinoflash.eth", "xnicoleanistonx.eth", "yangcliu.eth", "brennentaylor.eth", "benahorowitz.eth", "jaywilliams.eth", "shaycarl.eth", "kemal.eth", "altimet.eth", "paya.eth", "jiho.eth", "crystalhefner.eth", "drpatel.eth", "kevinvonjames.eth", "tayzonday.eth", "soybienmamon.eth", "takashix.eth",  "etinspires.eth", "cashbros.eth", "teufzer.eth", "unknown.eth", "highsnobiety.eth", "bizzleosikoya.eth", "coltonunderwood.eth", "ryanfoland.eth", "don-diablo.eth", "alrawenet.eth", "wendyo.eth", "anyasa.eth", "bitcoinbro.eth", "katechastain.eth", "gmoney.eth", "3xpiggy.eth", "hiten.eth", "djsamhouse.eth", "columbusshort.eth", "synthdaddy.eth", "lilmango.eth", "sharpp.eth", "dexfowler.eth", "jowyang.eth", "looksrare.eth", "jauz.eth", "myrtlesarrosa.eth", "jagrit.eth", "biancoresearch.eth", "hayden.eth", "boredweb3.eth", "bankless.eth", "chuboi.eth", "sassal.eth", "brennasparks.eth", "ardakutsal.eth", "voltura.eth", "dpakman.eth", "dcinvestor.eth", "ens.eth", "kosukekitajima.eth", "rsa.eth", "cryptomammoth.eth", "nicoboy.eth", "bumhunter.eth", "chris.eth", "vincentyu.eth", "sharifaalbarami.eth", "thuancapital.eth", "path.eth", "cvbelieve.eth", "marlonhumphrey.eth", "richerd.eth", "fronz.eth", "brandonsalim.eth", "tboyd.eth", "iyin.eth", "vondoom.eth", "yasink.eth"]


    const subgraphHostedServiceProvider =
      new dataProviders.SubgraphHostedServiceProvider({
        url: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
      });

    type domain = { name: string; resolvedAddress: { id: string } };

    const getAddress = async (ens: string) => {
      const topEns = await subgraphHostedServiceProvider.query<{
        domains: domain[];
      }>(
        gql`
          query getDomain{
            domains(where: {name: "${ens}"}) {
              name
              resolvedAddress {
                id
              }
            }
          }
          `
      );
      return topEns.domains[0].resolvedAddress.id;
    };

    for await (const item of ensNames) {
      const address = (await getAddress(item)) as string;
      dataProfiles[address] = 1;
    }

    return [
      {
        name: "top-100-ens",
        timestamp: context.timestamp,
        description: "Be one of the top 100 twitter accounts with an ENS as a twitter handle",
        specs: "",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.User],
      },
    ];
  },
};

export default generator;

//yarn generate-group local-group --additional-data 0x9992847Cb19492673457f7f088Eb2d102F98aeCC
