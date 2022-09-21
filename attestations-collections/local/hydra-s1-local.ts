import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";
import { AttestationsCollection } from "topics/attester/attester.types";
import { BadgesCollection } from "topics/badge";


function makeGameJutsuAttestationCollection(firstInternalCollectionId:number): AttestationsCollection[] {
  let result: AttestationsCollection[] = [];
  let internalCollectionId = firstInternalCollectionId;
  for (const achievement of ['winner', 'loser', 'draw', 'cheater']) {
    for (const grade of ['bronze', 'silver', 'gold']) {
      result.push({
        internalCollectionId,
        groupFetcher: async (groupStore) => [
          await groupStore.latest(`gamejutsu-${grade}-${achievement}`),
        ],
      });
      internalCollectionId++;
    }
  }
  return result;
};

export const hydraS1LocalAttester = generateHydraS1Attester(
  {
    [Network.Local]: {
      attesterAddress: "0xa73a8094E303A823a8b64089fFD79913E76092cF",
      rootsRegistryAddress: "0x4CA636f37b577BfEEcE58eEc19053AC4490365BB",
    },
  },
  {
    name: "hydra-s1-local",
    networks: [Network.Local],
    attestationsCollections: [
      // Sismo contributors
      {
        internalCollectionId: 0,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      // Fake Masquerade
      {
        internalCollectionId: 1,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      // Fake ethereum power users
      {
        internalCollectionId: 2,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("local-group"),
        ],
      },
      ...makeGameJutsuAttestationCollection(3)
    ],
  }
);

export const hydraS1LocalBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Local]: 10000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Contributor ZK Badge",
      description: "ZK Badge received by Sismo contributors",
      image: "sismo_digger.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 1,
      name: "Sismo Masquerade Bloomer ZK Badge",
      description:
        "ZK Badge owned by @masquerade.lens and @sismo.lens Lens followers",
      image: "sismo_masquerade_bloomers.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 2,
      name: "Ethereum Power Users ZK Badge",
      description: "ZK Badge owned by the most active users of Ethereum",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 3,
      name: "Gamejutsu White Belt Winner ZK Badge",
      description: "The player won one game at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 4,
      name: "Gamejutsu Brown Belt Winner ZK Badge",
      description: "The player won five games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 5,
      name: "Gamejutsu Black Belt Winner ZK Badge",
      description: "The player won ten games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 6,
      name: "Gamejutsu White Belt Loser ZK Badge",
      description: "The player losed one game at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 7,
      name: "Gamejutsu Brown Belt Loser ZK Badge",
      description: "The player losed five games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 8,
      name: "Gamejutsu Black Belt Loser ZK Badge",
      description: "The player losed ten games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 9,
      name: "Gamejutsu White Belt Draw ZK Badge",
      description: "The player drawed one game at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 10,
      name: "Gamejutsu Brown Belt Draw ZK Badge",
      description: "The player drawed five games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 11,
      name: "Gamejutsu Black Belt Draw ZK Badge",
      description: "The player drawed ten games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 12,
      name: "Gamejutsu White Belt Cheater ZK Badge",
      description: "The player cheated one game at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 13,
      name: "Gamejutsu Green Belt Cheater ZK Badge",
      description: "The player cheated five games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
    {
      internalCollectionId: 14,
      name: "Gamejutsu Black Belt Cheater ZK Badge",
      description: "The player cheated ten games in row at gamejutsu.app",
      image: "ethereum_power_users.svg",
      attributes: {},
      requirements: [],
    },
  ],
};
