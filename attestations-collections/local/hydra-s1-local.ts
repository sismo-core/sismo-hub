// nocommit
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
      description: "ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      groupGeneratorName: "local-group",
      publicContacts: [{
        type: "github",
        contact: "leosayous21"
      }],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 1,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description: "ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      groupGeneratorName: "local-group",
      publicContacts: [{
        type: "github",
        contact: "leosayous21"
      }],
      eligibility: {
        shortDescription: "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specification: "",
      },
      links: []
    },
    {
      internalCollectionId: 2,
      name: "Ethereum Power Users ZK Badge",
      description: "ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      groupGeneratorName: "local-group",
      publicContacts: [{
        type: "github",
        contact: "leosayous21"
      }],
      eligibility: {
        shortDescription: "Be part of the top 0.1% most active users on Ethereum",
        specification: "",
      },
      links: []
    },
  ],
};
