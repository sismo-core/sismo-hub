import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x12e69A9b08709324d64c5AEaF4169b03B6199c6C",
    rootsRegistryAddress: "0xdDa4c8d2933dAA21Aac75B88fF59725725ba813F",
  },

  {
    name: "hydra-s1-simple",
    network: Network.Goerli,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
    attestationsCollections: [],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Goerli]: 20000001,
  },
  badges: [],
};

