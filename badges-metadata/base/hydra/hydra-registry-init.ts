import { HydraS1OffchainRegistryTreeBuilder } from "./hydra-off-chain-registry-tree";
import { HydraS1AccountboundRegistryTreeBuilder } from './hydra-s1-accountbound-registry-tree';
import {
  RegistryTreeComputeContext,
  Network,
  RegistryTreeBuilder,
  RegistryTreeConfiguration,
} from "topics/registry-tree";

export const initRegistryTree = (
  context: RegistryTreeComputeContext,
  registryTreeConfiguration: RegistryTreeConfiguration,
  network: Network
): RegistryTreeBuilder => {
  const networkConfiguration =
    registryTreeConfiguration.networksConfiguration[network];
  if (networkConfiguration === undefined) {
    throw new Error("The network is not configured for this attester.");
  }

  if (registryTreeConfiguration.attestationsCollections) {
    return new HydraS1AccountboundRegistryTreeBuilder(
      context,
      networkConfiguration,
      registryTreeConfiguration.attestationsCollections
    );
  } else {
    return new HydraS1OffchainRegistryTreeBuilder(
      context,
      networkConfiguration
    );
  }
};
