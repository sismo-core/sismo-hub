// nocommit
import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1LocalAttester = generateHydraS1Attester(
  {
    attesterAddress: "0xa73a8094E303A823a8b64089fFD79913E76092cF",
    rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
  },
  {
    name: "hydra-s1-local",
    network: Network.Local,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
    attestationsCollections: [
      // Fake ethereum power users
      {
        internalCollectionId: 4,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      // Fake PoH
      {
        internalCollectionId: 8,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      // Fake GR15
      {
        internalCollectionId: 25,
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
      internalCollectionId: 4,
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
    {
      internalCollectionId: 8,
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupGeneratorName: "proof-of-humanity",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Prove you are a human with PoH",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "PoH",
          url: "https://www.proofofhumanity.id/",
        },
      ],
    },
    {
      internalCollectionId: 25,
      name: "GR15 Gitcoin Contributor ZK Badge",
      description:
        "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grants_round_15_donors.svg",
      groupGeneratorName: "gitcoin-grants-rounds-donors",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "You must have donated in the 15th round of Gitcoin Grants",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "GR15",
          url: "https://gitcoin.co/grants/explorer",
        },
      ],
    },
  ],
};
