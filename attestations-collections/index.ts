import { hydraS1LocalAttester, hydraS1LocalBadges } from "./hydra-s1-local";
import { hydraS1SimpleAttester, hydraS1SimpleBadges } from "./hydra-s1-simple";
import { AttestersLibrary } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const badges: BadgesCollection[] = [
  hydraS1SimpleBadges,
  hydraS1LocalBadges,
];

export const attesters: AttestersLibrary = {
  "hydra-s1-local": hydraS1LocalAttester,
  "hydra-s1-simple": hydraS1SimpleAttester,
};
