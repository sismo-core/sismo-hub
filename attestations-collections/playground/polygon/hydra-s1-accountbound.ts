import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1AccountboundAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x66331568ca321e333aB25a74BCF0c2623730bd4B",
    rootsRegistryAddress: "0xb8797eBa1048f6A6AfCbE4F08a582b4Dde69C05d",
  },
  {
    name: "hydra-s1-accountbound",
    network: Network.Polygon,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.accountboundEncoder,
    attestationsCollections: [
      // sismo-stargazers
      {
        internalCollectionId: 1,
        groupFetcher: async (groupStore) => [
          await groupStore.latest("sismo-stargazers"),
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
    [Network.Polygon]: 20000001,
  },
  badges: [
    {
      internalCollectionId: 1,
      name: "Sismo GitHub Stargazer ZK Badge",
      description:
        "ZK Badge owned by users that starred the Sismo Protocol on GitHub. This badge is the first Github-bound ZK Badge!",
      image: "sismo_stargazers.svg",
      groupGeneratorName: "sismo-stargazers",
      publicContacts: [
        {
          type: "twitter",
          contact: "@sismo_eth",
        },
      ],
      eligibility: {
        shortDescription: "Starred the Sismo Protocol on GitHub",
        specification: "",
      },
      links: [
        {
          logoUrl: "",
          label: "Sismo Github",
          url: "https://github.com/sismo-core/sismo-protocol",
        },
      ],
    },
  ],
};
