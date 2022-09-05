import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttesterSandbox = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x0AB188c7260666146B300aD3ad5b2AB99eb91D45",
      rootsRegistryAddress: "0xb8797eBa1048f6A6AfCbE4F08a582b4Dde69C05d",
    },
  },

  {
    name: "hydra-s1-simple-sandbox",
    networks: [Network.Polygon],
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
      {
        internalCollectionId: 5,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-bronze"),
        ],
      },
      {
        internalCollectionId: 6,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-silver"),
        ],
      },
      {
        internalCollectionId: 7,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-hat-gold"),
        ],
      },
    ],
  }
);

export const hydraS1SimpleSandboxBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 10000001,
    [Network.Rinkeby]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "[sandbox] ZK Badge: Sismo Digger",
      description: "[sandbox] ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 1,
      name: "[sandbox] ZK Badge: Sismo Citizen",
      description: "[sandbox] ZK Badge received by early supporters of Sismo",
      image: "sismo_citizen.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 2,
      name: "[sandbox] ZK Badge: Sismo Guest",
      description:
        "[sandbox] ZK Badge received by community members of frens of Sismo",
      image: "sismo_guest.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 3,
      name: "[sandbox] Sismo Masquerade Bloomer ZK Badge",
      description:
        "[sandbox] ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 4,
      name: "[sandbox] Ethereum Power Users ZK Badge",
      description:
        "[sandbox] ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 5,
      name: "[sandbox] Bronze proof of hat",
      description: "[sandbox] Bronze bounty completed",
      image: "proof-of-hat-bronze.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 6,
      name: "[sandbox] Silver proof of hat",
      description: "[sandbox] Silver bounty completed",
      image: "proof-of-hat-silver.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 7,
      name: "[sandbox] Gold proof of hat",
      description: "[sandbox] Gold bounty completed",
      image: "proof-of-hat-gold.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
