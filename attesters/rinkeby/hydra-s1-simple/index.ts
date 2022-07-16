import { AttestationsCollection } from "../../../src/topics/attestations-collection/attestations-collection";
import { Attester } from "../../../src/topics/attester";
import { AttesterChain } from "../../../src/topics/attester/types";
import { Badge } from "../../../src/topics/badge";
import { Group } from "../../../src/topics/group";

export default async () =>
  new Attester({
    collectionIdFirst: 10000001,
    chain: AttesterChain.Polygon,
    contractAddress: "",
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
