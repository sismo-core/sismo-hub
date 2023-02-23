import { BadgeMetadata, BadgesCollection } from "topics/badge";
import { Flow } from "topics/flow";
import { RegistryTreeConfiguration } from "topics/registry-tree";

export const standardizedSubtitleForFlow = (groupName: string) => {
  return (
    "Mint " +
    groupName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

export const createFlows = ({
  badgesCollection,
  customizedFlows,
  registryTreeConfiguration,
}: {
  badgesCollection: BadgesCollection;
  customizedFlows: Flow[];
  registryTreeConfiguration: RegistryTreeConfiguration;
}) => {
  return badgesCollection.badges.map((badge: BadgeMetadata) => {
    const customizedFlow = customizedFlows.find(
      (flow) => flow.path === badge.groupSnapshot.groupName
    );
    return (
      customizedFlow ??
      ({
        path: badge.groupSnapshot.groupName,
        registryTree: registryTreeConfiguration.name,
        networks: badge.networks,
        registryTreeType: "hydra-s1",
        badgesCollection: badgesCollection,
        badgesInternalCollectionsIds: [badge.internalCollectionId],
        title: "",
        logoUrl: null,
        //  subtitle with groupName capitalized after each "-"
        subtitle: standardizedSubtitleForFlow(badge.groupSnapshot.groupName),
        onboardingDescription: "",
        ctaLabel: "",
        ctaUrl: "",
        congratulationTexts: ["Congrats!"],
      } as Flow)
    );
  });
};
