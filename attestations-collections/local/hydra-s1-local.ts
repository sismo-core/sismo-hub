import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1LocalAttester = generateHydraS1Attester(
  {
    [Network.Local]: {
      attesterAddress: "0xa73a8094E303A823a8b64089fFD79913E76092cF",
      rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
    },
  },
  {
    name: "hydra-s1-local",
    networks: [Network.Local],
    attestationsCollections: [
      // Sismo contributors
      {
        internalCollectionId: 0,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      // Fake Masquerade
      {
        internalCollectionId: 1,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      // Fake ethereum power users
      {
        internalCollectionId: 2,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      // Circularmerch lens followers
      {
        internalCollectionId: 3,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("circularmerch-lens-followers"),
        ],
      },
      // You are 50 most followed
      {
        internalCollectionId: 4,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("lens-50-best-followed"),
        ],
      },
    ],
  }
);

export const hydraS1LocalBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Local]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Contributor ZK Badge",
      description: "ZK Badge received by Sismo contributors",
      image: "sismo_digger.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 1,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description:
        "ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 2,
      name: "Ethereum Power Users ZK Badge",
      description: "ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 3,
      name: "CircularMerch lens followers ZK Badge",
      description: "ZK Badge owned by @circlemerch.lens Lens followers",
      image: "circularmerch_lens_followers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 4,
      name: "lens 50 best followed ZK Badge",
      description: "ZK Badge for the 50 most followed",
      image: "lens_50_best_followed.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
