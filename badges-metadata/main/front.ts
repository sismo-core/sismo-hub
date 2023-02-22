import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";
import { BadgeAttribute, BadgeAttributeValue } from "topics/badge/badge-attributes";

export const frontBadges: BadgesCollection = {
  collectionIdFirst: 0,
  badges: [
    {
      internalCollectionId: 0,
      networks: [Network.Polygon, Network.Goerli, Network.Mumbai],
      name: "Sismo Early User ZK Badge",
      description: "ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      groupSnapshot: { groupName: "sismo-early-users" },
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.MEDIUM,
      },
      links: [],
    },
  ],
};
