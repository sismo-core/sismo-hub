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
          await groupStore.latest("sismo-contributors"),
        ],
      },
      // Masquerade
      {
        internalCollectionId: 1,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-masquerade-lens-followers"),
        ],
      },
      // Pooly Minters
      {
        internalCollectionId: 2,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("pooly-minters"),
        ],
      },
      // APWine City Collectors
      {
        internalCollectionId: 3,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("apwinecity-lens-publication-collectors"),
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
      name: "ZK Badge: Sismo Contributor",
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
      name: "Pooly minter ZK Badge",
      description:
          "ZK Badge owned by Pooly minters",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 3,
      name: "APWine City Collectors ZK Badge",
      description:
          "ZK Badge owned by APWine City Collectors",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
