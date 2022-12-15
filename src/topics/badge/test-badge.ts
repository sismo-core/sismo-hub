/* istanbul ignore file */
import { BadgesCollection } from ".";
import { Network } from "topics/attester";

export const testBadgesCollection: BadgesCollection = {
  collectionIdFirst: 1001,
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
      networks: [Network.Test],
    },
    {
      internalCollectionId: 1,
      name: "Test Badge 2",
      description: "Test Badge 2",
      image: "./badges/test2.svg",
      groupGeneratorName: "test-group-2",
      publicContacts: [],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
      networks: [Network.Test],
    },
    {
      internalCollectionId: 2,
      name: "Test Badge 3",
      description: "Test Badge 3",
      image: "./badges/test3.svg",
      groupGeneratorName: "test-group-3",
      publicContacts: [],
      eligibility: {
        shortDescription: "",
        specification: "",
      },
      links: [],
      networks: [Network.Local],
    },
  ],
};
