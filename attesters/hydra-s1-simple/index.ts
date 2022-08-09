import { HydraS1Attester } from "@attesters/base/hydra-s1";
import { Network } from "topics/attester";

export default class HydraS1SimpleAttester extends HydraS1Attester {
  name = "hydra-s1-simple";
  networks = {
    [Network.Polygon]: { address: "", collectionIdFirst: 10000001 },
  };
  attestationsCollections = [
    // Sismo friends
    {
      internalCollectionId: 0,
      groupFetcher: async () => [await this.groupStore.latest("sismo-diggers")],
      badge: {
        name: "ZK Badge: Sismo Digger",
        description: "ZK Badge received by early contributors of Sismo",
        image: "./badges/sismo_digger.svg",
        requirements: [],
        attributes: [],
      },
    },
    {
      internalCollectionId: 1,
      groupFetcher: async () => [
        await this.groupStore.latest("sismo-citizens"),
      ],
      badge: {
        name: "ZK Badge: Sismo Citizen",
        description: "ZK Badge received by early supporters of Sismo",
        image: "./badges/sismo_citizen.svg",
        attributes: [],
        requirements: [],
      },
    },
    {
      internalCollectionId: 2,
      groupFetcher: async () => [], // [await this.groupStore.latest("sismo-guests")]
      badge: {
        name: "ZK Badge: Sismo Guest",
        description: "ZK Badge received by community members of frens of Sismo",
        image: "./badges/sismo_guest.svg",
        attributes: [],
        requirements: [],
      },
    },
    // Masquerade
    {
      internalCollectionId: 3,
      groupFetcher: async () => [
        await this.groupStore.latest("sismo-masquerade-lens-followers"),
      ],
      badge: {
        name: "Sismo Masquerade Bloomer ZK Badge",
        description:
          "ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
        image: "./badges/sismo_masquerade_bloomers.svg",
        attributes: [],
        requirements: [],
      },
    },
    // Ethereum-power-users
    {
      internalCollectionId: 4,
      groupFetcher: async () => [
        await this.groupStore.latest("ethereum-power-users"),
      ],
      badge: {
        name: "Ethereum Power Users ZK Badge",
        description: "ZK Badge owned by the most active users of Ethereum",
        image: "./badges/ethereum_power_users.svg",
        attributes: [],
        requirements: [],
      },
    },
  ];
}
