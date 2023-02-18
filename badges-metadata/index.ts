import {
  hydraS1LocalAttester,
  hydraS1LocalBadges,
} from "@badges-metadata/local/hydra-s1-accountbound";
import { pythia1LocalBadges } from "@badges-metadata/local/pythia-1-local";

import { frontBadges as frontProdBadges } from "@badges-metadata/main/front";
import {
  hydraS1AccountboundBadges as hydraS1AccountboundProdBadges,
  hydraS1AccountboundAttester as hydraS1AccountboundProdAttester,
} from "@badges-metadata/main/hydra-s1-accountbound";
import { hydraS1OffchainAttester as hydraS1OffchainMainAttester } from "@badges-metadata/main/hydra-s1-off-chain";
import { pythia1SimpleBadges as pythia1SimpleProdBadges } from "@badges-metadata/main/pythia-1-simple";

import { frontBadges as frontPlaygroundBadges } from "@badges-metadata/playground/front";
import {
  hydraS1AccountboundBadges as hydraS1AccountboundPlaygroundBadges,
  hydraS1AccountboundAttester as hydraS1AccountboundPlaygroundAttester,
} from "@badges-metadata/playground/hydra-s1-accountbound";
import { pythia1SimpleBadges as pythia1SimplePlaygroundBadges } from "@badges-metadata/playground/pythia-1-simple";

import { frontBadges as frontStagingBadges } from "@badges-metadata/staging/front";
import {
  hydraS1AccountboundBadges as hydraS1AccountboundStagingBadges,
  hydraS1AccountboundAttester as hydraS1AccountboundStagingAttester,
} from "@badges-metadata/staging/hydra-s1-accountbound";
import { hydraS1OffchainAttester as hydraS1OffchainStagingAttester } from "@badges-metadata/staging/hydra-s1-off-chain";
import { pythia1SimpleBadges as pythia1SimpleStagingBadges } from "@badges-metadata/staging/pythia-1-simple";

import { RegistryTreesConfigurationsLibrary } from "topics/attester";
import { BadgesCollection } from "topics/badge";

export const localBadges: BadgesCollection[] = [
  hydraS1LocalBadges,
  pythia1LocalBadges,
];

export const stagingBadges: BadgesCollection[] = [
  frontStagingBadges,
  hydraS1AccountboundStagingBadges,
  pythia1SimpleStagingBadges,
];

export const playgroundBadges: BadgesCollection[] = [
  frontPlaygroundBadges,
  hydraS1AccountboundPlaygroundBadges,
  pythia1SimplePlaygroundBadges,
];

export const prodBadges: BadgesCollection[] = [
  frontProdBadges,
  hydraS1AccountboundProdBadges,
  pythia1SimpleProdBadges,
];

export const localAttesters: RegistryTreesConfigurationsLibrary = {
  "hydra-s1-accountbound": hydraS1LocalAttester,
};

export const stagingAttesters: RegistryTreesConfigurationsLibrary = {
  "hydra-s1-accountbound": hydraS1AccountboundStagingAttester,
  "hydra-s1-off-chain": hydraS1OffchainStagingAttester,
};

export const playgroundAttesters: RegistryTreesConfigurationsLibrary = {
  "hydra-s1-accountbound": hydraS1AccountboundPlaygroundAttester,
};

export const prodAttesters: RegistryTreesConfigurationsLibrary = {
  "hydra-s1-accountbound": hydraS1AccountboundProdAttester,
  "hydra-s1-off-chain": hydraS1OffchainMainAttester,
};
