import { generateHydraS1Attester } from "@attesters/base/hydra-s1";
import { Network } from "topics/attester";

export const hydraS1SimpleAttester = generateHydraS1Attester({
  name: "hydra-s1-simple",
  networks: {
    // Contract addresses for Polygon are available here
    // https://github.com/sismo-core/sismo-protocol/releases/tag/alpha-prod-polygon-07-08-2002
    [Network.Polygon]: {
      attesterAddress: "0x10b27d9efa4A1B65412188b6f4F29e64Cf5e0146",
      collectionIdFirst: 10000001,
      rootsRegistryAddress: "0xEce747769BD44A7854c8C0913A91Aa801e42D0d0",
    },
  },
  attestationsCollections: [
    // Sismo friends
    {
      internalCollectionId: 0,
      groupFetcher: async (groupStore) => [
        await groupStore.latest("sismo-diggers"),
      ],
      badge: {
        name: "ZK Badge: Sismo Digger",
        description: "ZK Badge received by early contributors of Sismo",
        image: "sismo_digger.svg",
        attributes: {},
        requirements: [],
      },
    },
    {
      internalCollectionId: 1,
      groupFetcher: async (groupStore) => [
        await groupStore.latest("sismo-citizens"),
      ],
      badge: {
        name: "ZK Badge: Sismo Citizen",
        description: "ZK Badge received by early supporters of Sismo",
        image: "sismo_citizen.svg",
        attributes: {},
        requirements: [],
      },
    },
    {
      internalCollectionId: 2,
      groupFetcher: async () => [], // [await this.groupStore.latest("sismo-guests")]
      badge: {
        name: "ZK Badge: Sismo Guest",
        description: "ZK Badge received by community members of frens of Sismo",
        image: "sismo_guest.svg",
        attributes: {},
        requirements: [],
      },
    },
    // Masquerade
    {
      internalCollectionId: 3,
      groupFetcher: async (groupStore) => [
        await groupStore.latest("sismo-masquerade-lens-followers"),
      ],
      badge: {
        name: "Sismo Masquerade Bloomer ZK Badge",
        description:
          "ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
        image: "sismo_masquerade_bloomers.svg",
        attributes: {},
        requirements: [],
      },
    },
    // Ethereum-power-users
    {
      internalCollectionId: 4,
      groupFetcher: async (groupStore) => [
        await groupStore.latest("ethereum-power-users"),
      ],
      badge: {
        name: "Ethereum Power Users ZK Badge",
        description: "ZK Badge owned by the most active users of Ethereum",
        image: "ethereum_power_users.svg",
        attributes: {},
        requirements: [],
      },
    },
  ],
});

export default hydraS1SimpleAttester;
