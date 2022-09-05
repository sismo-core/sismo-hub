import {
  hydraS1SimpleAttesterSandbox,
  hydraS1SimpleSandboxBadges,
} from "@attestations-collections/hydra-s1-simple-sandbox";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const sandboxFlows: Flow[] = [
  {
    path: "ethereum-power-users",
    attester: hydraS1SimpleAttesterSandbox.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleSandboxBadges,
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
  {
    path: "safe-alert",
    attester: hydraS1SimpleAttesterSandbox.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleSandboxBadges,
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
    path: "web3-patreon",
    attester: hydraS1SimpleAttesterSandbox.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleSandboxBadges,
    badgesInternalCollectionsIds: [4],
    title: "Web3 Patreon",
    logoUrl: null,
    subtitle: "Become a Power User on W3P",
    onboardingDescription:
      "By minting this Badge you will be able to provide an additional reputation verification for your Web3Patreon subscribers.",
    ctaLabel: "Go Back to Web3Patreon",
    ctaUrl: "https://web3patreon-alpha.vercel.app/profile",
    congratulationTexts: ["Congratulations !"],
  },
  {
    path: "misfitwear",
    attester: hydraS1SimpleAttesterSandbox.name,
    network: Network.Polygon,
    attesterType: "hydra-s1",
    badgesCollection: hydraS1SimpleSandboxBadges,
    badgesInternalCollectionsIds: [4],
    title: "MISFITWEAR",
    logoUrl: null,
    subtitle: "Join the club",
    onboardingDescription:
      "By minting this badge you will be able to claim exclusive content, discounts and curated items from our partners.",
    ctaLabel: "Go Back to MISFITWEAR",
    ctaUrl: "https://zkshop.vercel.app/",
    congratulationTexts: ["Congratulations !"],
  },
];
