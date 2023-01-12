import {
  hydraS1AccountboundAttester,
  hydraS1AccountboundBadges,
} from "@badges-metadata/staging/hydra-s1-accountbound";
import { mainFlows } from "@flows/main";
import { Network } from "topics/attester";
import { Flow } from "topics/flow";

export const stagingFlows: Flow[] = [
  ...mainFlows,
  {
    path: "ziki-pass",
    attester: hydraS1AccountboundAttester.name,
    networks: [Network.Goerli],
    attesterType: "hydra-s1",
    badgesCollection: hydraS1AccountboundBadges,
    badgesInternalCollectionsIds: [514],
    title: "",
    logoUrl: null,
    subtitle: "Get your zikiPass ZK Badge",
    onboardingDescription: "",
    ctaLabel: "",
    ctaUrl: "",
    congratulationTexts: ["Congrats!"],
  },
];
