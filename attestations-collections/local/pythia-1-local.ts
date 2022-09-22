// nocommit
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const pythia1LocalBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Local]: 30000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Synaps Liveness ZK Badge",
      description:
        "ZK Badge owned by users that proved their liveness with Synaps",
      image: "synaps_liveness.svg",
      attributes: {},
      requirements: ["Prove your Liveness with Synaps"],
    },
  ],
};
