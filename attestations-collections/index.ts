import { hydraS1LocalAttester, hydraS1LocalBadges } from "./hydra-s1-local";
import {
  hydraS1SimpleAttester as hydraS1SimpleAttesterPolygon,
  hydraS1SimpleBadges as hydraS1SimplePolygonBadges,
} from "./hydra-s1-simple-polygon";
import {
  hydraS1SimpleAttester as hydraS1SimpleAttesterPolygonPlayground,
  hydraS1SimpleBadges as hydraS1SimplePolygonPlaygroundBadges,
} from "./hydra-s1-simple-polygon-playground";
import {
  hydraS1SimpleAttester as hydraS1SimpleRinkeby,
  hydraS1SimpleBadges as hydraS1SimpleRinkebyBadges,
} from "./hydra-s1-simple-rinkeby";
import { AttestersLibrary } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const badges: BadgesCollection[] = [
  hydraS1LocalBadges,
  hydraS1SimplePolygonBadges,
  hydraS1SimplePolygonPlaygroundBadges,
  hydraS1SimpleRinkebyBadges,
];

export const attesters: AttestersLibrary = {
  "hydra-s1-local": hydraS1LocalAttester,
  "hydra-s1-simple-polygon": hydraS1SimpleAttesterPolygon,
  "hydra-s1-simple-polygon-playground": hydraS1SimpleAttesterPolygonPlayground,
  "hydra-s1-simple-rinkeby": hydraS1SimpleRinkeby,
};
