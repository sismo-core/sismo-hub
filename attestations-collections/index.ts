import {
  hydraS1SimpleAttester as hydraS1SimpleAttesterPolygon,
  hydraS1SimpleBadges as hydraS1SimplePolygonBadges,
  frontBadges as frontPolygonBadges,
} from "./curated/polygon/hydra-s1-simple";
import { pythia1SimpleBadges as pythia1SimplePolygonBadges } from "./curated/polygon/pythia-1-simple";
import {
  hydraS1LocalAttester,
  hydraS1LocalBadges,
} from "./local/hydra-s1-local";
import { pythia1LocalBadges } from "./local/pythia-1-local";
import {
  hydraS1SimpleAttester as hydraS1SimpleAttesterPolygonPlayground,
  hydraS1SimpleBadges as hydraS1SimplePolygonPlaygroundBadges,
  frontBadges as frontPolygonPlaygroundBadges,
} from "./playground/polygon/hydra-s1-simple";
import { pythia1SimpleBadges as pythia1SimplePolygonPlaygroundBadges } from "./playground/polygon/pythia-1-simple";
import {
  hydraS1SimpleAttester as hydraS1SimpleGoerli,
  hydraS1SimpleBadges as hydraS1SimpleGoerliBadges,
  frontBadges as frontGoerliBadges,
} from "./staging/goerli/hydra-s1-simple";
import { pythia1SimpleBadges as pythia1SimpleGoerliBadges } from "./staging/goerli/pythia-1-simple";
import { AttestersLibrary } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const localBadges: BadgesCollection[] = [
  hydraS1LocalBadges,
  pythia1LocalBadges,
];

export const stagingBadges: BadgesCollection[] = [
  hydraS1SimpleGoerliBadges,
  pythia1SimpleGoerliBadges,
  frontGoerliBadges,
];

export const playgroundBadges: BadgesCollection[] = [
  hydraS1SimplePolygonPlaygroundBadges,
  pythia1SimplePolygonPlaygroundBadges,
  frontPolygonPlaygroundBadges,
];

export const prodBadges: BadgesCollection[] = [
  hydraS1SimplePolygonBadges,
  pythia1SimplePolygonBadges,
  frontPolygonBadges,
];

export const localAttesters: AttestersLibrary = {
  "hydra-s1-local": hydraS1LocalAttester,
};

export const stagingAttesters: AttestersLibrary = {
  "hydra-s1-simple": hydraS1SimpleGoerli,
};

export const playgroundAttesters: AttestersLibrary = {
  "hydra-s1-simple": hydraS1SimpleAttesterPolygonPlayground,
};

export const prodAttesters: AttestersLibrary = {
  "hydra-s1-simple": hydraS1SimpleAttesterPolygon,
};
