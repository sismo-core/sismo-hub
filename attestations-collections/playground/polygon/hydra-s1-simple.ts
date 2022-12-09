import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x66331568ca321e333aB25a74BCF0c2623730bd4B",
    rootsRegistryAddress: "0xb8797eBa1048f6A6AfCbE4F08a582b4Dde69C05d",
  },
  {
    name: "hydra-s1-simple",
    network: Network.Polygon,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.simpleEncoder,
    attestationsCollections: [],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 20000001,
  },
  badges: [],
};
