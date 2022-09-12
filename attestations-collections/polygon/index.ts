import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x10b27d9efa4A1B65412188b6f4F29e64Cf5e0146",
      rootsRegistryAddress: "0xEce747769BD44A7854c8C0913A91Aa801e42D0d0",
    },
  },

  {
    name: "hydra-s1-simple",
    networks: [Network.Polygon],
    attestationsCollections: [
      // Sismo friends
      {
        internalCollectionId: 0,
        groupFetcher: async () => [], // await groupStore.latest("sismo-diggers"),
      },
      {
        internalCollectionId: 1,
        groupFetcher: async () => [], // await groupStore.latest("sismo-citizens"),
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
      // proof-of-humanity
      {
        internalCollectionId: 8,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("proof-of-humanity"),
        ],
      },
    ],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 10000001,
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
        "ZK Badge owned by @sismo.lens and @masquerade.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [
        "Follow @sismo.lens and @masquerade.lens before July 6 2022",
      ],
    },
    {
      internalCollectionId: 4,
      name: "Ethereum Power User ZK Badge",
      description: "ZK Badge owned by the most active users on Ethereum",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: ["Be part of the top 0.1% most active users on Ethereum"],
    },
    {
      internalCollectionId: 8,
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      attributes: {},
      requirements: ["Prove you are a human with POH"],
    },
  ],
};

export const pythia1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 30000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Synaps Liveness ZK Badge",
      description:
        "ZK Badge owned by users that proved their liveness with Synaps",
      image: "synaps_liveness.svg",
      attributes: {},
      requirements: ["Prove your Liveness with Synaps"],
    },
  ],
};

export const frontBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 0,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Early User ZK Badge",
      description: "ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
