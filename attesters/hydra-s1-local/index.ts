import { generateHydraS1Attester } from "@attesters/base/hydra-s1";
import { Network } from "topics/attester";

export const hydraS1LocalAttester = generateHydraS1Attester({
  name: "hydra-s1-local",
  networks: {
    [Network.Local]: {
      attesterAddress: "0xa73a8094E303A823a8b64089fFD79913E76092cF",
      collectionIdFirst: 10000001,
      rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
    },
  },
  attestationsCollections: [
    // Sismo contributors
    {
      internalCollectionId: 0,
      groupFetcher: async (groupStore) => [
        await groupStore.latest("sismo-contributors"),
      ],
      badge: {
        name: "ZK Badge: Sismo Contributor",
        description: "ZK Badge received by Sismo contributors",
        image: "sismo_digger.svg",
        attributes: {},
        requirements: [],
      },
    },
  ],
});

export default hydraS1LocalAttester;
