import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const pythia1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 30000001,
  },
  badges: [
    // {
    //   internalCollectionId: 0,
    //   name: "Synaps Liveness ZK Badge",
    //   description:
    //     "ZK Badge owned by users that proved their liveness with Synaps",
    //   image: "synaps_liveness.svg",
    //   attributes: {},
    //   requirements: ["Prove your Liveness with Synaps"],
    // },
  ],
};
