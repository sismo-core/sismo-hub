import { HydraS1Attester } from "@attesters/base/hydra-s1";
import { Network } from "topics/attester";

export default class HydraS1SimpleAttester extends HydraS1Attester {
  name = "hydra-s1-local";
  networks = {
    [Network.Local]: { address: "", collectionIdFirst: 1001 },
  };
  attestationsCollections = [
    // Sismo contributors
    {
      internalCollectionId: 0,
      groupFetcher: async () => [
        await this.groupStore.latest("sismo-contributors"),
      ],
      badge: {
        name: "ZK Badge: Sismo Contributor",
        description: "ZK Badge received by Sismo contributors",
        image: "sismo_digger.svg",
        attributes: {},
        requirements: [],
      },
    },
  ];
}
