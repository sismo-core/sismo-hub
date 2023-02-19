import {
  hydraS1LocalRegistryTree,
  hydraS1LocalBadges,
} from "@badges-metadata/local/hydra-s1-accountbound";
import { pythia1LocalBadges } from "@badges-metadata/local/pythia-1-local";

import { frontBadges as frontProdBadges } from "@badges-metadata/main/front";
import {
  hydraS1AccountboundBadges as hydraS1AccountboundProdBadges,
  hydraS1AccountboundRegistryTreeConfig as hydraS1AccountboundRegistryTreeProdConfig,
} from "@badges-metadata/main/hydra-s1-accountbound";
import { hydraS1OffchainRegistryTreeConfig as hydraS1OffchainRegistryTreeProdConfig } from "@badges-metadata/main/hydra-s1-off-chain";
import { pythia1SimpleBadges as pythia1SimpleProdBadges } from "@badges-metadata/main/pythia-1-simple";

import { frontBadges as frontPlaygroundBadges } from "@badges-metadata/playground/front";
import {
  hydraS1AccountboundBadges as hydraS1AccountboundPlaygroundBadges,
  hydraS1AccountboundRegistryTreeConfig as hydraS1AccountboundRegistryTreePlaygroundConfig,
} from "@badges-metadata/playground/hydra-s1-accountbound";
import { pythia1SimpleBadges as pythia1SimplePlaygroundBadges } from "@badges-metadata/playground/pythia-1-simple";

import { frontBadges as frontStagingBadges } from "@badges-metadata/staging/front";
import {
  hydraS1AccountboundBadges as hydraS1AccountboundStagingBadges,
  hydraS1AccountboundRegistryTreeConfig as hydraS1AccountboundRegistryTreeStagingConfig,
} from "@badges-metadata/staging/hydra-s1-accountbound";
import { hydraS1OffchainRegistryTreeConfig as hydraS1OffchainRegistryTreeStagingConfig } from "@badges-metadata/staging/hydra-s1-off-chain";
import { pythia1SimpleBadges as pythia1SimpleStagingBadges } from "@badges-metadata/staging/pythia-1-simple";

import { BadgesCollection } from "topics/badge";
import { RegistryTreesConfigurationsLibrary } from "topics/registry-tree";

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

export const localRegistryTreeConfigs: RegistryTreesConfigurationsLibrary = {
  "hydra-s1-accountbound": hydraS1LocalRegistryTree,
};

export const stagingRegistryTreeConfigs: RegistryTreesConfigurationsLibrary = {
  "hydra-s1-accountbound": hydraS1AccountboundRegistryTreeStagingConfig,
  "hydra-s1-off-chain": hydraS1OffchainRegistryTreeStagingConfig,
};

export const playgroundRegistryTreeConfigs: RegistryTreesConfigurationsLibrary =
  {
    "hydra-s1-accountbound": hydraS1AccountboundRegistryTreePlaygroundConfig,
  };

export const prodRegistryTreeConfigs: RegistryTreesConfigurationsLibrary = {
  "hydra-s1-accountbound": hydraS1AccountboundRegistryTreeProdConfig,
  "hydra-s1-off-chain": hydraS1OffchainRegistryTreeProdConfig,
};
