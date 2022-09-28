import { dataOperators } from "@group-generators/helpers/data-operators";
import { GroupStore, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: [
    "masquerade-polygon-zk-badge-holders",
    "sismo-gen-a",
    "sismo-gen-x",
    "sismo-gen-zero",
    "sismo-events",
    "poh-polygon-zk-badge-holders",
    "ethereum-power-users-polygon-zk-badge-holders",
    "sismo-gitcoin-donors",
    "sismo-diggers"
  ],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {

    const latestMasqueradePolygonGroup = await groupStore.latest("masquerade-polygon-zk-badge-holders")
    const latestSismoGenAGroup = await groupStore.latest("sismo-gen-a")
    const latestSismoGenXGroup = await groupStore.latest("sismo-gen-x")
    const latestSismoGenZeroGroup = await groupStore.latest("sismo-gen-zero")
    const latestSismoEvents = await groupStore.latest("sismo-events")
    const latestPoHPolygonGroup = await groupStore.latest("poh-polygon-zk-badge-holders")
    const latestEthereumPowerUserPolygonZkBadgeGroup = await groupStore.latest("ethereum-power-users-polygon-zk-badge-holders")
    const latestSismoGitcoinDonorsGroup = await groupStore.latest("sismo-gitcoin-donors")
    const latestSismoDiggersGroup = await groupStore.latest("sismo-diggers");

    // tier attribution
    
    const masquerade = dataOperators.Map(await latestMasqueradePolygonGroup.data(), 1)                                  // 1
    const sismoGenZero = dataOperators.Map(await latestSismoGenZeroGroup.data(), 1)                                     // Gen[0]: 1
    const sismoGenX = dataOperators.Map(await latestSismoGenXGroup.data(), 2)                                           // Gen[X]: 2
    const sismoGenA = dataOperators.Map(await latestSismoGenAGroup.data(), 2)                                           // Gen[A]: 2
    const sismoEvents =  dataOperators.Map(await latestSismoEvents.data(), 2)                                           // EthCC, PreMasquerade, Masquerade : 2
    const pohGroup = dataOperators.Map(await latestPoHPolygonGroup.data(), 2)                                           // 2
    const ethereumPowerUserZkBadge = dataOperators.Map(await latestEthereumPowerUserPolygonZkBadgeGroup.data(), 2)      // 2
    const sismoGitcoinDonors = dataOperators.Map(await latestSismoGitcoinDonorsGroup.data(), 2)                         // 2 
    const sismoDiggers = dataOperators.Map(await latestSismoDiggersGroup.data(), 3)                                     // 3

    // Sismo Team
    const sismoTeam = {
      "0x8ab1760889f26cbbf33a75fd2cf1696bfccdc9e6": 3, // dhadrien.sismo.eth
      "0xf61cabba1e6fc166a66bca0fcaa83762edb6d4bd": 3, // leosayous21.sismo.eth
      "0x97d0bc262dfc2fbe2e6c62883a669e765fe3d83e": 3, // gabinh.sismo.eth
      "0x74184bff3cf29e82e4d8cb3b7f1d5a89fdd0eb15": 3, // charlscharls.sismo.eth
      "0x32108e5f09f0df35aefc2ef4c520bbd06a57dae5": 3, // samsb.sismo.eth
      "0xE77F1CF03C50090CD45238BEB35470d4eabBDc74": 3, // bigq11.eth
      "0x4a9a2f31e2009045950df5aab36950609de93c78": 3, // jrag.eth
    }

    
    const sismoContributorsData = dataOperators.Union([masquerade, sismoGenZero, sismoGenX, sismoGenA, sismoEvents, pohGroup, ethereumPowerUserZkBadge, sismoGitcoinDonors, sismoDiggers, sismoTeam])

    return [
      {
        name: "sismo-contributors",
        timestamp: context.timestamp,
        data: sismoContributorsData,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
