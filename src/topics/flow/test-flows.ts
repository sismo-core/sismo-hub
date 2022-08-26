import { Flow } from ".";
import { Network } from "topics/attester";
import { testAttester } from "topics/attester/test-attester";
import { testBadgesCollection } from "topics/badge/test-badge";

export const testFlows: Flow[] = [
  {
    path: "test-flow-1",
    attester: testAttester.name,
    network: Network.Test,
    attesterType: "hydra-s1",
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
    attester: testAttester.name,
    network: Network.Test,
    attesterType: "hydra-s1",
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
];
