import {
  hydraS1LocalAttester,
  hydraS1LocalBadges,
} from "@attestations-collections/local/hydra-s1-local";
import { pythia1LocalBadges } from "@attestations-collections/local/pythia-1-local";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";



const gamejutsuCommon = { 
  attester: hydraS1LocalAttester.name,
  network: Network.Local,
  attesterType: "hydra-s1",
  badgesCollection: hydraS1LocalBadges,
  logoUrl: null,
  onboardingDescription: "Access gated GameJutsu channel and become an active member of the ChainHackers state channel gamers", // hype your users !
  ctaLabel: "Access gated channels",
  ctaUrl: "https://discord.gg/a5E9vWbp9R",
  congratulationTexts: ["Welcome to the miracle!"],
}


export const localFlows: Flow[] = [
  {
    path: "synaps-liveness",
    attester: "pythia-1-local",
    network: Network.Local,
    attesterType: "pythia-1",
    badgesCollection: pythia1LocalBadges,
    badgesInternalCollectionsIds: [0],
    title: "Synaps",
    logoUrl: null,
    subtitle: "Prove you are not a bot",
    onboardingDescription:
      "This ZK Badge is an attestation that you are a human and not a bot. It is used by diverse applications (e.g Lens) as a sybil resistant tool.",
    ctaLabel: "See your badge",
    ctaUrl: "",
    congratulationTexts: [
      "You can now prove that you are",
      "not a bot by showing this badge!",
    ],
  },
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
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [3],
    path: "gamejutsu-bronze-winner",
    title: "GameJutsu Winner",
    subtitle: "Attest your first win at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [4],
    path: "gamejutsu-silver-winner",
    title: "GameJutsu Winner",
    subtitle: "Attest your fifth repetitive win at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [5],
    path: "gamejutsu-gold-winner",
    title: "GameJutsu Winner",
    subtitle: "Attest your 10th repetitive win at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [6],
    path: "gamejutsu-bronze-loser",
    title: "GameJutsu Loser",
    subtitle: "Attest your first lose at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [7],
    path: "gamejutsu-silver-loser", 
    title: "GameJutsu Loser",
    subtitle: "Attest your fifth repetitive lose at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [8],
    path: "gamejutsu-gold-loser",
    title: "GameJutsu Loser",
    subtitle: "Attest your 10th repetitive lose at gamejutsu.app at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [9],
    path: "gamejutsu-bronze-draw",
    title: "GameJutsu Draw",
    subtitle: "Attest your first draw at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [10],
    path: "gamejutsu-silver-draw",
    title: "GameJutsu Draw",
    subtitle: "Attest your fifth repetitive draw at gamejutsu.app at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [11],
    path: "gamejutsu-gold-draw",
    title: "GameJutsu Draw",
    subtitle: "Attest your 10th repetitive draw at gamejutsu.app at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [12],
    path: "gamejutsu-bronze-cheater",
    title: "GameJutsu Cheater",
    subtitle: "Attest your first cheat at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [13],
    path: "gamejutsu-silver-cheater",
    title: "GameJutsu Cheater",
    subtitle: "Attest your fifth repetitive cheat at gamejutsu.app at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [14],
    path: "gamejutsu-gold-cheater",
    title: "GameJutsu Cheater",
    subtitle: "Attest your 10th repetitive cheat at gamejutsu.app at gamejutsu.app",
  },
  ];
