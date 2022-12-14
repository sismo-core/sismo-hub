import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { hydraS1GroupPropertiesEncoders } from "@badges-metadata/base/hydra-s1/hydra-s1-properties-encoder";
import { Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const hydraS1SimpleAttester = generateHydraS1Attester(
  {
    [Network.Polygon]: {
      attesterAddress: "0x095590c542571df14c6220c3163112286a5f7518",
      rootsRegistryAddress: "0xece747769bd44a7854c8c0913a91aa801e42d0d0",
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
