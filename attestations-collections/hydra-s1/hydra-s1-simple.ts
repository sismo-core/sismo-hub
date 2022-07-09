import { AttestationsCollection } from "../../src/attestations-collection/attestations-collection";
import { Badge } from "../../src/badge/badge";
import { Attester } from "../../src/attester/attester";
import { Group } from "../../src/group"

export const hydraS1SimpleAttester = async () =>
  new Attester({
    collectionIdFirst: 100001,
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
        badge: new Badge({}),
      }),
    ],
  });
