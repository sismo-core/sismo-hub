import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const frontBadges: BadgesCollection = {
  collectionIdFirst: 0,
  badges: [
    {
      internalCollectionId: 0,
      name: "[playground] Sismo Early User ZK Badge",
      description: "[playground] ZK Badge owned by Sismo Early users",
      image: "sismo_early_users.svg",
      groupSnapshot: { groupName: "sismo-early-users" },
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      links: [],
      networks: [Network.Polygon],
    },
  ],
};
