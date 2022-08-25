import { hydraS1SimpleAttester } from "@attesters/hydra-s1-simple";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const prodFlows: Flow[] = [
  {
    path: "masquerade",
    attester: hydraS1SimpleAttester,
    network: Network.Polygon,
    badgesInternalCollectionsIds: [3],
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
    attester: hydraS1SimpleAttester,
    network: Network.Polygon,
    badgesInternalCollectionsIds: [4],
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
