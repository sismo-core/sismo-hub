import { generateHydraS1Attester } from "@badges-metadata/base/hydra-s1";
import { hydraS1AccountboundBadges as hydraS1AccountboundBadgesMain } from "@badges-metadata/main/hydra-s1-accountbound";
import { Network } from "topics/attester";
import { BadgeMetadata, BadgesCollection } from "topics/badge";
import { GroupStore } from "topics/group";

export const hydraS1AccountboundBadges: BadgesCollection = {
  ...hydraS1AccountboundBadgesMain,
};

export const hydraS1AccountboundAttester = generateHydraS1Attester(
  {
    [Network.Goerli]: {
      attesterAddress: "0x89d80C9E65fd1aC8970B78A4F17E2e772030C1cB",
      rootsRegistryAddress: "0xdDa4c8d2933dAA21Aac75B88fF59725725ba813F",
    },
    [Network.Mumbai]: {
      attesterAddress: "0x069e6B99f4DA543156f66274FC6673442803C587",
      rootsRegistryAddress: "0x2c17e335d131dfd21238475Dd545B9B29Fb5A27D",
    },
  },
  {
    name: "hydra-s1-accountbound",
    attestationsCollections: hydraS1AccountboundBadges.badges.map((badge: BadgeMetadata) => {
      if (!badge.groupFetcher && !badge.groupSnapshot.groupName) {
        throw new Error("Either groupFetcher or groupName should be specified !");
      }
      const groupFetcher = badge.groupFetcher
        ? badge.groupFetcher
        : async (groupStore: GroupStore) => [
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            (
              await groupStore.search({
                groupName: badge.groupSnapshot.groupName,
                ...(badge.groupSnapshot.timestamp
                  ? { timestamp: badge.groupSnapshot.timestamp }
                  : { latest: true }),
              })
            )[0],
          ];
      return {
        internalCollectionId: badge.internalCollectionId,
        networks: badge.networks,
        groupFetcher,
      };
    }),
  }
);
