import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1AccountboundAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x89d80C9E65fd1aC8970B78A4F17E2e772030C1cB",
    rootsRegistryAddress: "0xdDa4c8d2933dAA21Aac75B88fF59725725ba813F",
  },
  {
    name: "hydra-s1-accountbound",
    network: Network.Goerli,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.accountboundEncoder,
    attestationsCollections: [
      // sismo-hub-contributor
      {
        internalCollectionId: 1,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-hub-github-contributors"),
        ],
        additionalGroupProperties: {
          cooldownDuration: 10,
        },
      },
    ],
  }
);

export const hydraS1AccountboundBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Goerli]: 20000001,
  },
  badges: [
    {
      internalCollectionId: 0,
      name: "Sismo Hub ZK Badge",
      description:
        "ZK Badge owned by users that commitment to the Sismo Hub github repository",
      image: "sismo_masquerade_bloomers.svg",
      groupGeneratorName: "sismo-hub-github-contributors",
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
