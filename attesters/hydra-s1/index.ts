import { AttestationsCollection } from "../../src/topics/attestations-collection";
import { Attester, AttesterNetwork } from "../../src/topics/attester";
import { Badge } from "../../src/topics/badge";
import { Group } from "../../src/topics/group";

export default async () =>
  new Attester({
    name: "hydra-s1-simple",
    configurations: {
      polygon: {
        firstCollectionId: 10000001,
        address: "",
      },
    },
    defaultCurrentTargetNetwork: AttesterNetwork.Polygon,
    attestationsCollections: [
      // Sismo friends
      new AttestationsCollection({
        groups: [await Group.store.latest("sismo-diggers")],
        badge: new Badge({
          name: "ZK Badge: Sismo Digger",
          description: "ZK Badge received by early contributors of Sismo",
          image: "./badges/badge_digger.svg",
          requirements: [],
        }),
      }),
      new AttestationsCollection({
        groups: [await Group.store.latest("sismo-citizens")],
        badge: new Badge({
          name: "ZK Badge: Sismo Citizen",
          description: "ZK Badge received by early supporters of Sismo",
          image: "./badges/badge_citizen.svg",
          requirements: [],
        }),
      }),
      new AttestationsCollection({
        groups: [], // [await Group.store.latest("sismo-guests")],
        badge: new Badge({
          name: "ZK Badge: Sismo Guest",
          description:
            "ZK Badge received by community members of frens of Sismo",
          image: "./badges/badge_guest.svg",
          requirements: [],
        }),
      }),
      // Masquerade
      new AttestationsCollection({
        groups: [await Group.store.latest("sismo-masquerade-lens-followers")],
        badge: new Badge({
          name: "ZK Badge: Sismo Masquerade Bloomers",
          description: "ZK Badge received by masquerade bloomers",
          image: "./badges/badge_masquerade_bloomer.svg",
          requirements: [],
        }),
      }),
    ],
  });
