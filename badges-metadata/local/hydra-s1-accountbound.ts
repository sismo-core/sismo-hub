// nocommit
import { generateHydraS1RegistryTreeConfig } from "@badges-metadata/base/hydra";
import { BadgeMetadata, BadgesCollection } from "topics/badge";
import { BadgeAttribute, BadgeAttributeValue } from "topics/badge/badge-attributes";
import { GroupStore } from "topics/group";
import { Network } from "topics/registry-tree";

export const hydraS1LocalBadges: BadgesCollection = {
  collectionIdFirst: 10000001,
  badges: [
    {
      internalCollectionId: 0,
      networks: [Network.Local],
      name: "Sismo Contributor ZK Badge",
      description: "ZK Badge received by early contributors of Sismo",
      image: "sismo_digger.svg",
      groupSnapshot: {
        groupName: "local-group",
      },
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
      links: [],
    },
    {
      internalCollectionId: 4,
      networks: [Network.Local],
      name: "Ethereum Power Users ZK Badge",
      description: "ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      groupSnapshot: {
        groupName: "local-group",
      },
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
      links: [],
    },
    {
      internalCollectionId: 8,
      networks: [Network.Local],
      name: "Proof of Humanity ZK Badge",
      description: "ZK Badge owned by verified humans on POH",
      image: "proof_of_humanity.svg",
      groupSnapshot: {
        groupName: "local-group",
      },
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
      description: "ZK Badge owned by contributors of the 15th round of Gitcoin Grants",
      image: "gitcoin_grants_round_15_donors.svg",
      groupSnapshot: {
        groupName: "local-group",
      },
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
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

export const hydraS1LocalRegistryTree = generateHydraS1RegistryTreeConfig(
  {
    [Network.Local]: {
      attesterAddress: "0xa73a8094E303A823a8b64089fFD79913E76092cF",
      rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
    },
  },
  {
    name: "hydra-s1-accountbound",
    attestationsCollections: hydraS1LocalBadges.badges.map((badge: BadgeMetadata) => {
      if (!badge.groupFetcher && !badge.groupSnapshot.groupName) {
        throw new Error("Either groupFetcher or groupName should be specified !");
      }
      const groupFetcher = badge.groupFetcher
        ? badge.groupFetcher
        : async (groupStore: GroupStore) => {
            const group =
              (
                await groupStore.search({
                  groupName: badge.groupSnapshot.groupName,
                  ...(badge.groupSnapshot.timestamp
                    ? { timestamp: badge.groupSnapshot.timestamp }
                    : { latest: true }),
                })
              )[0];
            if (!group) {
              throw new Error(
                `Group ${badge.groupSnapshot.groupName} not found, make sure that the group is generated before sending it to the attester.`
              );
            }
            return [group];
          };
      return {
        internalCollectionId: badge.internalCollectionId,
        networks: badge.networks,
        groupFetcher,
      };
    }),
  }
);
