import { HydraS1OffchainRegistryTreeBuilder } from "./hydra-s1-offchain-attester";
import { HydraS1AccountboundRegistryTreeBuilder } from "@badges-metadata/base/hydra-s1/hydra-s1-accountbound-attester";
import {
  AttesterComputeContext,
  Network,
  RegistryTreeBuilder,
  RegistryTreeConfiguration,
} from "topics/attester";

export const initRegistryTree = (
  context: AttesterComputeContext,
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
