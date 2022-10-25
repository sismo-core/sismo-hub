// nocommit
import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1LocalAccountboundAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x5C1294A4F2CaA2Bb3AEF8b56DA4e3BA0A6452125",
    rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
  },
  {
    name: "hydra-s1-local-accountbound",
    network: Network.Local,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.accountboundEncoder,
    attestationsCollections: [
      // Sismo contributors
      {
        internalCollectionId: 0,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
        additionalGroupProperties: {
          cooldownDuration: 3600 * 24 * 7, // 1 week
        },
      },
      // Fake Masquerade
      {
        internalCollectionId: 1,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
        additionalGroupProperties: {
          cooldownDuration: 3600 * 24 * 7, // 1 week
        },
      },
      // Fake ethereum power users
      {
        internalCollectionId: 2,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
        additionalGroupProperties: {
          cooldownDuration: 3600 * 24 * 7, // 1 week
        },
      },
    ],
  }
);

export const hydraS1LocalAccountboundBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Local]: 20000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Contributor ZK Badge",
      description: "ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      groupGeneratorName: "local-group",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 1,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description:
        "ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      groupGeneratorName: "local-group",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "Follow @sismo.lens and @masquerade.lens before July 6 2022",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 2,
      name: "Ethereum Power Users ZK Badge",
      description: "ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      groupGeneratorName: "local-group",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "Be part of the top 0.1% most active users on Ethereum",
        specification: "",
      },
      links: [],
    },
  ],
};
