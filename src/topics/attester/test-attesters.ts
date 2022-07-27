import { AttestationsCollection } from "../attestations-collection";
import { Badge } from "../badge";
import { Attester } from "./attester";

export default class extends Attester {
  name = "attester-1";
  networkConfigurations = {
    rinkeby: {
      address: "",
      firstCollectionId: 100,
    },
    polygon: {
      address: "",
      firstCollectionId: 100,
    },
  };
  attestationsCollections = [
    new AttestationsCollection({
      groupFetcher: async () => [],
      badge: new Badge({
        name: "ZK Badge: Test Badge",
        description: "ZK Badge received by testers",
        image: "./badges/badge_digger.svg",
        requirements: [],
      }),
    }),
  ];
}
