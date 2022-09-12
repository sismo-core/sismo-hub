import { hydraS1LocalAttester, hydraS1LocalBadges } from "./local";
import {
  hydraS1SimpleAttester as hydraS1SimpleAttesterPolygon,
  hydraS1SimpleBadges as hydraS1SimplePolygonBadges,
  pythia1SimpleBadges as pythia1SimplePolygonBadges,
  frontBadges as frontPolygonBadges,
} from "./polygon";
import {
  hydraS1SimpleAttester as hydraS1SimpleAttesterPolygonPlayground,
  hydraS1SimpleBadges as hydraS1SimplePolygonPlaygroundBadges,
  pythia1SimpleBadges as pythia1SimplePolygonPlaygroundBadges,
  frontBadges as frontPolygonPlaygroundBadges,
} from "./polygon-playground";
import {
  hydraS1SimpleAttester as hydraS1SimpleRinkeby,
  hydraS1SimpleBadges as hydraS1SimpleRinkebyBadges,
  pythia1SimpleBadges as pythia1SimpleRinkebyBadges,
  frontBadges as frontRinkebyBadges,
} from "./rinkeby";
import { AttestersLibrary } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const localBadges: BadgesCollection[] = [hydraS1LocalBadges];

export const stagingBadges: BadgesCollection[] = [
  hydraS1SimpleRinkebyBadges,
  pythia1SimpleRinkebyBadges,
  frontRinkebyBadges,
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
  "hydra-s1-simple": hydraS1SimpleRinkeby,
};

export const playgroundAttesters: AttestersLibrary = {
  "hydra-s1-simple": hydraS1SimpleAttesterPolygonPlayground,
};

export const prodAttesters: AttestersLibrary = {
  "hydra-s1-simple": hydraS1SimpleAttesterPolygon,
};
