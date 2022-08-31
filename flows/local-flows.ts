import {
  hydraS1LocalAttester,
  hydraS1LocalBadges,
} from "@attestations-collections/hydra-s1-local";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const localFlows: Flow[] = [
  {
    path: "contributors",
    attester: hydraS1LocalAttester.name,
    network: Network.Local,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1LocalBadges,
    badgesInternalCollectionsIds: [0],
    title: "Contributors",
    logoUrl: null,
    subtitle: "Show that you are an early contributor to Sismo.",
    onboardingDescription: "Mint this badge to show that you are an early Sismo contributor",
    ctaLabel: "Access gated channels",
    ctaUrl: "https://discord.gg/sismo",
    congratulationTexts: ["1. Congratulation"],
  },
  {
    path: "masquerade",
    attester: hydraS1LocalAttester.name,
    network: Network.Local,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1LocalBadges,
    badgesInternalCollectionsIds: [1],
    title: "Masquerade",
    logoUrl: null,
    subtitle: "Get your ticket",
    onboardingDescription:
      "Mint this badge to access the #masquerade-gate channel on the Sismo discord.",
    ctaLabel: "Access gated channel",
    ctaUrl: "https://discord.gg/sismo",
    congratulationTexts: [
      "1. Access #masquerade-gate",
      "2. Provide feedback on Sismo",
    ],
  },
  {
    path: "ethereum-power-users",
    attester: hydraS1LocalAttester.name,
    network: Network.Local,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1LocalBadges,
    badgesInternalCollectionsIds: [2],
    title: "Alpha",
    logoUrl: null,
    subtitle: "Join Ethereum Power Users community",
    onboardingDescription:
      "By minting this badge you will be able to participate on the governance around the Badge itself and enter a gated discord channel on Sismo's discord.",
    ctaLabel: "Access gated channel",
    ctaUrl: "https://discord.gg/sismo",
    congratulationTexts: ["Provide feedback on Discord", "Join Snapshot Space"],
  },
];
