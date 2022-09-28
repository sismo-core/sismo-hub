/* istanbul ignore file */
import { BadgesCollection } from ".";
import { Network } from "topics/attester";

export const testBadgesCollection: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Test]: 1001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Test Badge",
      description: "Test Badge",
      image: "./badges/test.svg",
      groupGeneratorName: "test-group",
      publicContacts: [
        {
          type: "github",
          contact: "leosayous21",
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
      name: "Test Badge 2",
      description: "Test Badge 2",
      image: "./badges/test2.svg",
      groupGeneratorName: "test-group-2",
      publicContacts: [
        {
          type: "github",
          contact: "leosayous21",
        },
      ],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
    },
  ],
};
