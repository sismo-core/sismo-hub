import {
  hydraS1AccountboundBadges,
  hydraS1AccountboundAttester,
} from "@badges-metadata/staging/hydra-s1-accountbound";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const stagingFlows: Flow[] = []

for (const network of [Network.Mumbai, Network.Goerli]) {
  const flows = [
    {
      path: "masquerade",
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
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
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
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
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
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
    // {
    //   path: "synaps-liveness",
    //   attester: "pythia-1-simple",
    //   network,
    //   attesterType: "pythia-1",
    //   badgesCollection: pythia1SimpleBadges,
    //   badgesInternalCollectionsIds: [0],
    //   title: "Synaps",
    //   logoUrl: null,
    //   subtitle: "Prove you are not a bot",
    //   onboardingDescription:
    //     "This ZK Badge is an attestation that you are a human and not a bot. It is used by diverse applications (e.g Lens) as a sybil resistant tool.",
    //   ctaLabel: "See your badge",
    //   ctaUrl: "",
    //   congratulationTexts: [
    //     "You can now prove that you are",
    //     "not a bot by showing this badge!",
    //   ],
    // },
    {
      path: "gr15",
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
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
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
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
      path: "ens-supporter",
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
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
      path: "twitter-ethereum-influencers",
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
      badgesInternalCollectionsIds: [38],
      title: "Hive.one",
      logoUrl: null,
      subtitle: "Prove that you are an Ethereum Influencer on Twitter",
      ctaLabel: "See my badge",
      ctaUrl: "",
      congratulationTexts: [
        "You can now prove that you are",
        "an Ethereum Influencer on Twitter",
      ],
    },
    {
      path: "sismo-contributor",
      attester: hydraS1AccountboundAttester.name,
      network,
      attesterType: "hydra-s1",
      badgesCollection: hydraS1AccountboundBadges,
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

  stagingFlows.push(...flows)
}
