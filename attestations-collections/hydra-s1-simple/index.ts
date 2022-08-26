import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x10b27d9efa4A1B65412188b6f4F29e64Cf5e0146",
      rootsRegistryAddress: "0xEce747769BD44A7854c8C0913A91Aa801e42D0d0",
    },
    [Network.Rinkeby]: {
      attesterAddress: "0xfE36e0b6865868721cB39ad0ab5e9808d6cDCA5c",
      rootsRegistryAddress: "0xA4b12eC7B8a2478EaF3d97CF339Bf0F5a7dBBCF2",
    },
  },

  {
    name: "hydra-s1-simple",
    networks: [Network.Polygon, Network.Rinkeby],
    attestationsCollections: [
      // Sismo friends
      {
        internalCollectionId: 0,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-diggers"),
        ],
      },
      {
        internalCollectionId: 1,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-citizens"),
        ],
      },
      {
        internalCollectionId: 2,
        groupFetcher: async () => [], // [await this.groupStore.latest("sismo-guests")]
      },
      // Masquerade
      {
        internalCollectionId: 3,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-masquerade-lens-followers"),
        ],
      },
      // Ethereum-power-users
      {
        internalCollectionId: 4,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("ethereum-power-users"),
        ],
      },
    ],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 10000001,
    [Network.Rinkeby]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "ZK Badge: Sismo Digger",
      description: "ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 1,
      name: "ZK Badge: Sismo Citizen",
      description: "ZK Badge received by early supporters of Sismo",
      image: "sismo_citizen.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 2,
      name: "ZK Badge: Sismo Guest",
      description: "ZK Badge received by community members of frens of Sismo",
      image: "sismo_guest.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 3,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description:
        "ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 4,
      name: "Ethereum Power Users ZK Badge",
      description: "ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
