import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const frontBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Goerli]: 0,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Early User ZK Badge",
      description: "ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      groupGeneratorName: "sismo-early-users",
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
  ],
};
