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
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 1,
      name: "Test Badge 2",
      description: "Test Badge 2",
      image: "./badges/test2.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
