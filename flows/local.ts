import {
  hydraS1LocalAttester,
  hydraS1LocalBadges,
} from "@attestations-collections/local";
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
    onboardingDescription:
      "Mint this badge to show that you are an early Sismo contributor",
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
    title: "",
    logoUrl: null,
    subtitle: "Get your ticket",
    onboardingDescription:
      "Prove you followed Sismo and Masquerade before July 6 2022 to get a chance to access the Masquerade party.",
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
    title: "",
    logoUrl: null,
    subtitle: "Join Ethereum Power Users community",
    onboardingDescription:
      "Prove you are one of the biggest Ethereum users and access the governance around the badge on snapshot.",
    ctaLabel: "Access gated channel",
    ctaUrl: "https://discord.gg/sismo",
    congratulationTexts: ["Provide feedback on Discord", "Join Snapshot Space"],
  },
];
