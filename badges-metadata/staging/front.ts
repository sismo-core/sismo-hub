import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const frontBadges: BadgesCollection = {
  collectionIdFirst: 0,
  badges: [
    {
      internalCollectionId: 0,
      networks: [Network.Goerli, Network.Mumbai],
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
