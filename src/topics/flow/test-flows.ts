import { Flow } from ".";
import { testBadgesCollection } from "topics/badge/test-badge";
import { Network } from "topics/registry-tree";
import { testRegistryTreeConfig } from "topics/registry-tree/test-registry-tree";

export const testFlows: Flow[] = [
  {
    path: "test-flow-1",
    registryTree: testRegistryTreeConfig.name,
    networks: [Network.Test],
    registryTreeType: "hydra-s1",
    badgesCollection: testBadgesCollection,
    badgesInternalCollectionsIds: [0, 1],
    title: "Test Flow 1",
    logoUrl: null,
    subtitle: "Test Subtitle",
    onboardingDescription: "Mint this badge to test.",
    ctaLabel: "Access gated channel",
    ctaUrl: "https://example.com/1",
    congratulationTexts: ["Congratulation 1", "Congratulation 2"],
  },
  {
    path: "test-flow-2",
    registryTree: testRegistryTreeConfig.name,
    networks: [Network.Test],
    registryTreeType: "hydra-s1",
    badgesCollection: testBadgesCollection,
    badgesInternalCollectionsIds: [1],
    title: "Test Flow 2",
    logoUrl: null,
    subtitle: "Test Subtitle",
    onboardingDescription: "Mint this badge to test.",
    ctaLabel: "Access gated channel",
    ctaUrl: "https://example.com/2",
    congratulationTexts: ["Congratulation 1", "Congratulation 2"],
  },
  {
    path: "test-flow-3",
    registryTree: testRegistryTreeConfig.name,
    networks: [Network.Test],
    registryTreeType: "hydra-s1",
    badgesCollection: testBadgesCollection,
    badgesInternalCollectionsIds: [3],
    title: "Test Flow 3",
    logoUrl: null,
    subtitle: "Test Subtitle",
    onboardingDescription: "Mint this badge to test.",
    ctaLabel: "Access gated channel",
    ctaUrl: "https://example.com/3",
    congratulationTexts: ["Congratulation 1", "Congratulation 2"],
  },
];
