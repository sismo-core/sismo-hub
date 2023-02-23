// nocommit
import {
  hydraS1LocalRegistryTree,
  hydraS1LocalBadges,
} from "@badges-metadata/local/hydra-s1-accountbound";
import { createFlows } from "@flows/utils";
import { Flow } from "topics/flow";
import { Network } from "topics/registry-tree";

const customizedLocalFlows: Flow[] = [
  {
    path: "ethereum-power-users",
    registryTree: hydraS1LocalRegistryTree.name,
    networks: [Network.Local],
    registryTreeType: "hydra-s1",
    badgesCollection: hydraS1LocalBadges,
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
    registryTree: hydraS1LocalRegistryTree.name,
    networks: [Network.Local],
    registryTreeType: "hydra-s1",
    badgesCollection: hydraS1LocalBadges,
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
    path: "gr15",
    registryTree: hydraS1LocalRegistryTree.name,
    networks: [Network.Local],
    registryTreeType: "hydra-s1",
    badgesCollection: hydraS1LocalBadges,
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
];

export const localFlows = createFlows({
  badgesCollection: hydraS1LocalBadges,
  customizedFlows: customizedLocalFlows,
  registryTreeConfiguration: hydraS1LocalRegistryTree,
});
