import {
  hydraS1LocalAttester,
  hydraS1LocalBadges,
} from "@attestations-collections/hydra-s1-local";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const localFlows: Flow[] = [
  {
    path: "local-flow",
    attester: hydraS1LocalAttester.name,
    network: Network.Local,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1LocalBadges,
    badgesInternalCollectionsIds: [0],
    title: "Local Flow",
    logoUrl: null,
    subtitle: "Local Flow",
    onboardingDescription: "This is a badge for local test",
    ctaLabel: "Local",
    ctaUrl: "https://discord.gg/sismo",
    congratulationTexts: ["1. Congratulation"],
  },
];
