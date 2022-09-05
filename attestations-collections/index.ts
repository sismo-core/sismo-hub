import { hydraS1LocalAttester, hydraS1LocalBadges } from "./hydra-s1-local";
import { hydraS1SimpleAttester, hydraS1SimpleBadges } from "./hydra-s1-simple";
import {
  hydraS1SimpleAttesterSandbox,
  hydraS1SimpleSandboxBadges,
} from "./hydra-s1-simple-sandbox";
import { AttestersLibrary } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const badges: BadgesCollection[] = [
  hydraS1SimpleBadges,
  hydraS1LocalBadges,
  hydraS1SimpleSandboxBadges,
];

export const attesters: AttestersLibrary = {
  "hydra-s1-local": hydraS1LocalAttester,
  "hydra-s1-simple": hydraS1SimpleAttester,
  "hydra-s1-simple-sandbox": hydraS1SimpleAttesterSandbox,
};
