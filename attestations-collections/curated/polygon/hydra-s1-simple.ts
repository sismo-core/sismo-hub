import { generateHydraS1Attester } from "@attestations-collections/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@attestations-collections/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    attesterAddress: "0x095590c542571df14c6220c3163112286a5f7518",
    rootsRegistryAddress: "0xEce747769BD44A7854c8C0913A91Aa801e42D0d0",
  },
  {
    name: "hydra-s1-simple",
    network: Network.Polygon,
    groupPropertiesEncoder: hydraS1GroupPropertiesEncoders.hydraS1Encoder,
    attestationsCollections: [],
  }
);

export const hydraS1SimpleBadges: BadgesCollection = {
  collectionIdFirsts: {
    [Network.Polygon]: 20000001,
  },
  badges: [],
};
