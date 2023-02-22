/* istanbul ignore file */
import { BadgesCollection } from ".";
import { Network } from "topics/attester";
import {
  BadgeAttribute,
  BadgeAttributeValue,
} from "topics/badge/badge-attributes";
import { testGroups } from "topics/group/test-groups";

export const testBadgesCollection: BadgesCollection = {
  collectionIdFirst: 1001,
  badges: [
    {
      internalCollectionId: 0,
      name: "Test Badge",
      description: "Test Badge",
      image: "./badges/test.svg",
      groupSnapshot: { groupName: testGroups.group1_0.name },
      publicContacts: [
        {
          type: "github",
          contact: "leosayous21",
        },
      ],
      curatedAttributes: {
        [BadgeAttribute.PRIVACY]: BadgeAttributeValue.VERY_HIGH,
        [BadgeAttribute.TRUSTLESSNESS]: BadgeAttributeValue.HIGH,
        [BadgeAttribute.SYBIL_RESISTANCE]: BadgeAttributeValue.MEDIUM,
      },
      links: [],
      networks: [Network.Test],
    },
    {
      internalCollectionId: 1,
      name: "Test Badge 2",
      description: "Test Badge 2",
      image: "./badges/test2.svg",
      groupSnapshot: { groupName: testGroups.group2_0.name },
      publicContacts: [],
      links: [],
      networks: [Network.Test],
    },
    {
      internalCollectionId: 2,
      name: "Test Badge 3",
      description: "Test Badge 3",
      image: "./badges/test3.svg",
      groupSnapshot: { groupName: testGroups.group3_0.name },
      publicContacts: [],
      links: [],
      networks: [Network.Local],
    },
    {
      internalCollectionId: 3,
      name: "Test Badge 4",
      description: "Test Badge 4",
      image: "./badges/test4.svg",
      groupSnapshot: { groupName: testGroups.group4_0.name },
      publicContacts: [],
      links: [],
      networks: [Network.Local, Network.Test],
    },
  ],
};
