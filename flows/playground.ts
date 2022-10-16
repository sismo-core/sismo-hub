import {
  hydraS1SimpleAttester,
  hydraS1SimpleBadges,
} from "@attestations-collections/playground/polygon/hydra-s1-simple";
import { pythia1SimpleBadges } from "@attestations-collections/playground/polygon/pythia-1-simple";
import { playgroundFactoryFlows } from "@flows/factory/playground-factory";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

const gamejutsuCommon = { 
  attester: hydraS1SimpleAttester.name,
  network: Network.Polygon,
  attesterType: "hydra-s1",
  badgesCollection: hydraS1SimpleBadges,
  logoUrl: null,
  onboardingDescription: "Access gated GameJutsu channel and become an active member of the ChainHackers state channel gamers", // hype your users !
  ctaLabel: "Access gated channels",
  ctaUrl: "https://discord.gg/a5E9vWbp9R",
  congratulationTexts: ["Welcome to the miracle!"],
}

export const playgroundFlows: Flow[] = [
  ...playgroundFactoryFlows,
  {
    path: "ethereum-power-users",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
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
    path: "safe-alert",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [5, 6, 7],
    title: "Safe Alert",
    logoUrl: null,
    subtitle: "Join Safe Alert community",
    onboardingDescription:
      "Safe alert is a dApp that protect the white hats interests by provinding them with a secure way to alert protocols of detected bugs and provinding them with a way to aassess publicly their skils and contribution.",
    ctaLabel: "Go Back to Safe Alert",
    ctaUrl: "http://localhost:3000/",
    congratulationTexts: ["Congratulations !"],
  },
  {
    path: "proof-of-humanity",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
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
    network: Network.Polygon,
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
    path: "proof-of-lepak-member",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1-simple",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [9],
    title: "Proof of Lepak Member",
    logoUrl: null,
    subtitle: "Prove you are a member from Lepak DAO",
    onboardingDescription:
      "This ZK Badge is an attestation proving that you are a Lepak Member. After getting your zkBadge, you are eligible for voting in Lepak DAO",
    ctaLabel: "See your badge",
    ctaUrl: "",
    congratulationTexts: ["You can now prove that you are a Lepak Member"],
  },
  {
    path: "circularmerch-lens-followers",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [10],
    title: "CircularMerch",
    logoUrl: null,
    subtitle: "Get your ticket",
    onboardingDescription: "Prove you follow Circlemerch",
    ctaLabel: "See your badges",
    ctaUrl: "",
    congratulationTexts: ["1. Congratulation"],
  },
  {
    path: "lens-50-best-followed",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [11],
    title: "50 most Followed",
    logoUrl: null,
    subtitle: "Get your ticket",
    onboardingDescription: "Prove you are 50 most followed",
    ctaLabel: "See your badges",
    ctaUrl: "",
    congratulationTexts: ["1. Congratulation"],
  },
  {
    path: "top-100-ens",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [12],
    title: "Top 100 ENS",
    logoUrl: null,
    subtitle: "Prove that you are across the top 100 ENS names by number of followers on Twitter",
    onboardingDescription:
      "This ZK Badge is an attestation that you are part of the top 100 ENS accounts by followers on Twitter. It can be used across different platform as a proof-of-reputation tool",
    ctaLabel: "See your badges",
    ctaUrl: "",
    congratulationTexts: ["1. Congratulation"],
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [13],
    path: "gamejutsu-bronze-winner",
    title: "White Belt Winner",
    subtitle: "Attest your first win at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [14],
    path: "gamejutsu-silver-winner",
    title: "Green Belt Winner",
    subtitle: "Attest your fifth repetitive win at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [15],
    path: "gamejutsu-gold-winner",
    title: "Black Belt Winner",
    subtitle: "Attest your 10th repetitive win at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [16],
    path: "gamejutsu-bronze-loser",
    title: "White Belt Loser",
    subtitle: "Attest your first lose at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [17],
    path: "gamejutsu-silver-loser", 
    title: "Green Belt Loser",
    subtitle: "Attest your fifth repetitive lose at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [18],
    path: "gamejutsu-gold-loser",
    title: "Black Belt Loser",
    subtitle: "Attest your 10th repetitive lose at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [19],
    path: "gamejutsu-bronze-draw",
    title: "White Belt Peacemonger",
    subtitle: "Attest your first draw at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [20],
    path: "gamejutsu-silver-draw",
    title: "Green Belt Peacemonger",
    subtitle: "Attest your fifth repetitive draw at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [21],
    path: "gamejutsu-gold-draw",
    title: "Black Belt Peacemonger",
    subtitle: "Attest your 10th repetitive draw at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [22],
    path: "gamejutsu-bronze-cheater",
    title: "White Belt In Cheating",
    subtitle: "Attest your first cheat at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [23],
    path: "gamejutsu-silver-cheater",
    title: "Green Belt In Cheating",
    subtitle: "Attest your fifth repetitive cheat at gamejutsu.app",
  },
  {
    ...gamejutsuCommon,
    badgesInternalCollectionsIds: [24],
    path: "gamejutsu-gold-cheater",
    title: "Black Belt In Cheating",
    subtitle: "Attest your 10th repetitive cheat at gamejutsu.app",
  },
  {
    path: "gr15",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
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
    path: "sismo-contributor",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
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
  {
    path: "martingbz-sismo-thread-1-lens-mirrorers",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [26],
    title: "martingbz.lens",
    logoUrl: null,
    subtitle: "Join the community of content interactors of martingbz.lens",
    onboardingDescription: "Prove you interacted (follow, mirror, collect etc...) on martingbz.lens profile",
    ctaLabel: "See your badge",
    ctaUrl: "",
    congratulationTexts: ["1. Congratulation"],
  },
  {
    path: "lilnouns-proplot-contributors",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [27, 28],
    title: "LilNouns Proplot Contributors",
    logoUrl: null,
    subtitle: "Attest your contributions on LilNouns's PropLot",
    onboardingDescription: "Become an active participant on PropLot",
    ctaLabel: "Become an Active Contributor",
    ctaUrl: "<https://lilnouns.wtf/ideas>",
    congratulationTexts: ["Keep contributing on PropLot!"],
  },
  {
    path: "proof-of-attendance",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
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
    path: "nft-collector",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [30],
    title: "NFT Collector",
    logoUrl: null,
    subtitle: "Attest you are a major NFT Collector",
    onboardingDescription: "You your NFT Collector ZK Badge proof to  increase privacy while providing the reputations", 
    ctaLabel: "",
    ctaUrl: "https://twitter.com/Web3PON",
    congratulationTexts: [
      "Congrats!"
    ],
  },
  {
    path: "ens-supporter",
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
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
    path: "snapshot-gitcoindao-voters", // choose your frontend path
    attester: hydraS1SimpleAttester.name,
    network: Network.Polygon,
    attesterType: "hydra-s1", // choose your attester
    badgesCollection: hydraS1SimpleBadges,
    badgesInternalCollectionsIds: [34], // choose your badge id here
    title: "Gitcoin Voters", // choose your title 
    logoUrl: null,
    subtitle: "Attest your vote on Snapshot's Gitcoin space", // choose your subtitle
    onboardingDescription: "Access gated Gitcoin channels and become an active member of the Gitcoin DAO", // hype your users !
    ctaLabel: "Access gated channels",
    ctaUrl: "<https://discord.gg/gitcoin>", // provide a link to your users. If you does not have a link you can add "" this will redirect to the sismo explorer.
    congratulationTexts: ["Join Snapshot space !"],
  },
];
