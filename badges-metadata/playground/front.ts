import { BadgesCollection } from "topics/badge";
import { Network } from "topics/registry-tree";

export const frontBadges: BadgesCollection = {
  collectionIdFirst: 0,
  badges: [
    {
      internalCollectionId: 0,
      name: "[playground] Sismo Early User ZK Badge",
      description: "[playground] ZK Badge owned by Sismo Early users",
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
      networks: [Network.Polygon],
    },
  ],
};
