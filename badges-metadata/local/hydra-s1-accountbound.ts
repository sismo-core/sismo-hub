// nocommit
import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { Network } from "topics/attester";
import { BadgeMetadata, BadgesCollection } from "topics/badge";
import {
  BadgeAttribute,
  BadgeAttributeValue,
} from "topics/badge/badge-attributes";
import { GroupStore } from "topics/group";

export const hydraS1LocalBadges: BadgesCollection = {
  collectionIdFirst: 10000001,
  badges: [
    {
      internalCollectionId: 0,
      networks: [Network.Local],
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.HIGH,
      },
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 4,
      networks: [Network.Local],
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.HIGH,
      },
      eligibility: {
        shortDescription:
          "Be part of the top 0.1% most active users on Ethereum",
        specification: "",
      },
      links: [],
    },
    {
      internalCollectionId: 8,
      networks: [Network.Local],
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupGeneratorName: "local-group",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.VERY_HIGH,
      },
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
      networks: [Network.Local],
      name: "GR15 Gitcoin Contributor ZK Badge",
      description:
        "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grants_round_15_donors.svg",
      groupGeneratorName: "local-group",
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
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.LOW,
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

export const hydraS1LocalAttester = generateHydraS1Attester(
  {
    [Network.Local]: {
      attesterAddress: "0xa73a8094E303A823a8b64089fFD79913E76092cF",
      rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
    },
  },
  {
    name: "hydra-s1-accountbound",
    attestationsCollections: hydraS1LocalBadges.badges.map(
      (badge: BadgeMetadata) => {
        if (!badge.groupFetcher && !badge.groupGeneratorName) {
          throw new Error(
            "Either groupFetcher or groupGeneratorName should be specified !"
          );
        }
        const groupFetcher = badge.groupFetcher
          ? badge.groupFetcher
          : async (groupStore: GroupStore) => [
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              await groupStore.latest(badge.groupGeneratorName!),
            ];
        return {
          internalCollectionId: badge.internalCollectionId,
          networks: badge.networks,
          groupFetcher,
        };
      }
    ),
  }
);
