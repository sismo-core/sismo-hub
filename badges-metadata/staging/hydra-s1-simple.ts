import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@badges-metadata/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Goerli]: {
      attesterAddress: "0x12e69A9b08709324d64c5AEaF4169b03B6199c6C",
      rootsRegistryAddress: "0xdDa4c8d2933dAA21Aac75B88fF59725725ba813F",
    },
    [Network.Mumbai]: {
      attesterAddress: "0x76D8Ed0e34555dEF84c2bfff9be85446e8E9fa2A",
      rootsRegistryAddress: "0x2c17e335d131dfd21238475Dd545B9B29Fb5A27D",
    },
  },
  {
    name: "hydra-s1-simple",
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
    attestationsCollections: [],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirst: 20000001,
  badges: [],
};
