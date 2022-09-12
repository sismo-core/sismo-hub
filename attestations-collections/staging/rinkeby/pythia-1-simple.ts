import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const pythia1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Rinkeby]: 30000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "[playground] Synaps Liveness ZK Badge",
      description:
        "[playground] ZK Badge owned by users that proved their liveness with Synaps",
      image: "synaps_liveness.svg",
      attributes: {},
      requirements: ["Prove your Liveness with Synaps"],
    },
  ],
};
