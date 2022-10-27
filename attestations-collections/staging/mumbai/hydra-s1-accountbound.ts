import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1AccountboundAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x76D8Ed0e34555dEF84c2bfff9be85446e8E9fa2A",
    rootsRegistryAddress: "0x2c17e335d131dfd21238475Dd545B9B29Fb5A27D",
  },
  {
    name: "hydra-s1-accountbound",
    network: Network.Mumbai,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.accountboundEncoder,
    attestationsCollections: [
      // sismo-hub-contributor
      {
        internalCollectionId: 0,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-hub-contributors-github"),
        ],
        additionalGroupProperties: {
          cooldownDuration: 3600 * 24 * 7, // 1 week
        },
      },
    ],
  }
);

export const hydraS1AccountboundBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Mumbai]: 20000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Hub ZK Badge",
      description:
        "ZK Badge owned by users that commitment to the Sismo Hub github repository",
      image: "sismo_contributors.svg",
      groupGeneratorName: "sismo-hub-contributors-github",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription:
          "Having a commit merged on the sismo-hub github repository",
        specification: "",
      },
      links: [],
    },
  ],
};
