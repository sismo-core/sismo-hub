import {
  hydraS1AccountboundAttester as hydraS1AccountboundAttesterPolygon,
  hydraS1AccountboundBadges as hydraS1AccountboundBadgesPolygon,
} from "./curated/polygon/hydra-s1-accountbound";
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
import {
  hydraS1LocalAccountboundAttester,
  hydraS1LocalAccountboundBadges,
} from "./local/hydra-s1-local-accountbound";
import { pythia1LocalBadges } from "./local/pythia-1-local";
import {
  hydraS1AccountboundAttester as hydraS1AccountboundAttesterPolygonPlayground,
  hydraS1AccountboundBadges as hydraS1AccountboundBadgesPolygonPlayground,
} from "./playground/polygon/hydra-s1-accountbound";
import {
  hydraS1SimpleAttester as hydraS1SimpleAttesterPolygonPlayground,
  hydraS1SimpleBadges as hydraS1SimplePolygonPlaygroundBadges,
  frontBadges as frontPolygonPlaygroundBadges,
} from "./playground/polygon/hydra-s1-simple";
import { pythia1SimpleBadges as pythia1SimplePolygonPlaygroundBadges } from "./playground/polygon/pythia-1-simple";
import { frontBadges as frontGoerliBadges } from "./staging/goerli/front";
import {
  hydraS1AccountboundAttester as hydraS1AccountboundAttesterGoerli,
  hydraS1AccountboundBadges as hydraS1AccountboundBadgesGoerli,
} from "./staging/goerli/hydra-s1-accountbound";
import {
  hydraS1SimpleAttester as hydraS1SimpleGoerli,
  hydraS1SimpleBadges as hydraS1SimpleGoerliBadges,
} from "./staging/goerli/hydra-s1-simple";
import { pythia1SimpleBadges as pythia1SimpleGoerliBadges } from "./staging/goerli/pythia-1-simple";
import { frontBadges as frontMumbaiBadges } from "./staging/mumbai/front";
import {
  hydraS1AccountboundAttester as hydraS1AccountboundAttesterMumbai,
  hydraS1AccountboundBadges as hydraS1AccountboundBadgesMumbai,
} from "./staging/mumbai/hydra-s1-accountbound";
import {
  hydraS1SimpleAttester as hydraS1SimpleMumbai,
  hydraS1SimpleBadges as hydraS1SimpleMumbaiBadges,
} from "./staging/mumbai/hydra-s1-simple";
import { pythia1SimpleBadges as pythia1SimpleMumbaiBadges } from "./staging/mumbai/pythia-1-simple";
import { AttestersLibrary, Network } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const localBadges: BadgesCollection[] = [
  hydraS1LocalBadges,
  pythia1LocalBadges,
  hydraS1LocalAccountboundBadges,
];

export const stagingBadges: BadgesCollection[] = [
  frontGoerliBadges,
  hydraS1SimpleGoerliBadges,
  hydraS1AccountboundBadgesGoerli,
  pythia1SimpleGoerliBadges,
  frontMumbaiBadges,
  hydraS1SimpleMumbaiBadges,
  hydraS1AccountboundBadgesMumbai,
  pythia1SimpleMumbaiBadges,
];

export const playgroundBadges: BadgesCollection[] = [
  hydraS1SimplePolygonPlaygroundBadges,
  hydraS1AccountboundBadgesPolygonPlayground,
  pythia1SimplePolygonPlaygroundBadges,
  frontPolygonPlaygroundBadges,
];

export const prodBadges: BadgesCollection[] = [
  hydraS1SimplePolygonBadges,
  hydraS1AccountboundBadgesPolygon,
  pythia1SimplePolygonBadges,
  frontPolygonBadges,
];

export const localAttesters: AttestersLibrary = {
  [Network.Local]: {
    "hydra-s1-local": hydraS1LocalAttester,
    "hydra-s1-local-accountbound": hydraS1LocalAccountboundAttester,
  },
};

export const stagingAttesters: AttestersLibrary = {
  [Network.Goerli]: {
    "hydra-s1-simple": hydraS1SimpleGoerli,
    "hydra-s1-accountbound": hydraS1AccountboundAttesterGoerli,
  },
  [Network.Mumbai]: {
    "hydra-s1-simple": hydraS1SimpleMumbai,
    "hydra-s1-accountbound": hydraS1AccountboundAttesterMumbai,
  },
};

export const playgroundAttesters: AttestersLibrary = {
  [Network.Polygon]: {
    "hydra-s1-simple": hydraS1SimpleAttesterPolygonPlayground,
    "hydra-s1-accountbound": hydraS1AccountboundAttesterPolygonPlayground,
  },
};

export const prodAttesters: AttestersLibrary = {
  [Network.Polygon]: {
    "hydra-s1-simple": hydraS1SimpleAttesterPolygon,
    "hydra-s1-accountbound": hydraS1AccountboundAttesterPolygon,
  },
};
