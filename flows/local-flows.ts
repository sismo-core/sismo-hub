import { hydraS1LocalAttester } from "@attesters/hydra-s1-local";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const localFlows: Flow[] = [
  {
    path: "local-flow",
    attester: hydraS1LocalAttester,
    network: Network.Local,
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
