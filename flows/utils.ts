import { BadgesCollection } from "topics/badge";
import { Flow } from "topics/flow";
import { RegistryTreeConfiguration } from "topics/registry-tree";

export const standardizedSubtitleForFlow = (name: string) => {
  return "Mint " + name;
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
  const flows: Flow[] = [...customizedFlows];

  for (const badge of badgesCollection.badges) {
    if (flows.length >= badgesCollection.badges.length) {
      return flows;
    }
    if (flows.find((flow: Flow) => flow.path === badge.groupSnapshot.groupName)) {
      continue;
    }
    flows.push({
      path: badge.groupSnapshot.groupName,
      registryTree: registryTreeConfiguration.name,
      networks: badge.networks,
      registryTreeType: "hydra-s1",
      badgesCollection: badgesCollection,
      badgesInternalCollectionsIds: [badge.internalCollectionId],
      title: "",
      logoUrl: null,
      //  subtitle with groupName capitalized after each "-"
      subtitle: standardizedSubtitleForFlow(badge.name),
      onboardingDescription: "",
      ctaLabel: "",
      ctaUrl: "",
      congratulationTexts: ["Congrats!"],
    } as Flow);
  }

  return flows;
};
