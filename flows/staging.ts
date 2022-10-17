import {
  hydraS1SimpleAttester,
  hydraS1SimpleBadges,
} from "@attestations-collections/staging/goerli/hydra-s1-simple";
import {
  hydraS1SimpleBadges as hydraS1SimpleBadgesMumbai
} from "@attestations-collections/staging/mumbai/hydra-s1-simple";
import { pythia1SimpleBadges } from "@attestations-collections/staging/goerli/pythia-1-simple";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const stagingFlows: Flow[] = [
  {
    path: "masquerade",
    attester: hydraS1SimpleAttester.name,
    network: Network.Mumbai,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadgesMumbai,
    badgesInternalCollectionsIds: [3],
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
    attester: hydraS1SimpleAttester.name,
    network: Network.Goerli,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [4],
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
    path: "proof-of-humanity",
    attester: hydraS1SimpleAttester.name,
    network: Network.Goerli,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [8],
    title: "Proof of Humanity",
    logoUrl: null,
    subtitle: "Prove you are a human with privacy",
    onboardingDescription:
      "This ZK Badge is an attestation proving that you are a human. It is used by diverse applications (e.g Lens) as a sybil resistant tool",
    ctaLabel: "See your badge",
    ctaUrl: "",
    congratulationTexts: [
      "You can now prove that you are a human",
      "and access human-gated services!",
    ],
  },
  {
    path: "synaps-liveness",
    attester: "pythia-1-simple",
    network: Network.Goerli,
    attesterType: "pythia-1",
    badgesCollection: pythia1SimpleBadges,
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
    path: "gr15",
    attester: hydraS1SimpleAttester.name,
    network: Network.Goerli,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [25],
    title: "GR15",
    logoUrl: null,
    subtitle: "Prove that you supported the Ethereum ecosystem",
    onboardingDescription:
      "This ZK Badge is an attestation that you are an active supporter of the Ethereum ecosystem",
    ctaLabel: "See my badge",
    ctaUrl: "",
    congratulationTexts: [
      "You can now prove that you are an active",
      "supporter of the Ethereum ecosystem",
    ],
  },
  {
    path: "proof-of-attendance",
    attester: hydraS1SimpleAttester.name,
    network: Network.Goerli,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [29],
    title: "POAP",
    logoUrl: null,
    subtitle: "Prove that you attended Ethereum events",
    ctaLabel: "See my badge",
    ctaUrl: "",
    congratulationTexts: [
      "You can now prove that you",
      "attended Ethereum events",
    ],
  },
  {
    path: "flex-loan",
    attester: hydraS1SimpleAttester.name,
    network: Network.Goerli,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [31],
    title: "Flex Loan",
    logoUrl: null,
    subtitle: "Get your attest to increase your score",
    onboardingDescription: "Prove you paid back a loan successfully.",
    ctaLabel: "Get my attest",
    ctaUrl:
      "https://flex-loan-frontend-flex-loan.vercel.app/goerli/get-liquidity",
    congratulationTexts: [
      "You have successfully attested your loan payback!",
      "Continue to loan paying back in time to increase your score",
    ],
  },
  {
    path: "ens-supporter",
    attester: hydraS1SimpleAttester.name,
    network: Network.Goerli,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [33],
    title: "ENS & Hive.one",
    logoUrl: null,
    subtitle: "Prove that you are a ENS supporter",
    ctaLabel: "See my badge",
    ctaUrl: "",
    congratulationTexts: [
      "You can now prove that you are part of",
      "the most reputable ENS domain accounts on Twitter",
    ],
  },
  {
    path: "sismo-contributor",
    attester: hydraS1SimpleAttester.name,
    network: Network.Goerli,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [5151110],
    title: "",
    logoUrl: null,
    subtitle: "Join Sismo Contributors Community",
    onboardingDescription:
      "This ZK Badge is an attestation that you are part of Sismo. You will be able to use it in Sismo Governance to voice your opinion and become owner of the project.",
    ctaLabel: "Join our discord",
    ctaUrl: "https://discord.gg/sismo",
    congratulationTexts: [
      "Thank you so much! We hope to see",
      "you further involved in Sismo",
    ],
  },
];
