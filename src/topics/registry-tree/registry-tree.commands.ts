/* istanbul ignore file */
import { Option } from "commander";
import { SismoHubCmd, GlobalOptions } from "cli/command";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";
import { Network } from "topics/registry-tree";

type RegistryTreeComputeOptions = Pick<
  GlobalOptions,
  "availableDataStore" | "availableGroupStore" | "groupStore" | "groupSnapshotStore" | "logger"
> & { sendOnChain: boolean; env: ConfigurationDefaultEnv; dryRun: boolean };

export const computeRegistryTree = async (
  registryTreeName: string,
  networks: Network[],
  {
    env,
    availableDataStore,
    availableGroupStore,
    groupStore,
    groupSnapshotStore,
    sendOnChain,
    dryRun,
    logger,
  }: RegistryTreeComputeOptions
): Promise<void> => {
  const registryTreeService = ServiceFactory.withDefault(env, {
    availableDataStore,
    availableGroupStore,
    groupStore,
    groupSnapshotStore,
    logger,
  }).getRegistryTreeService();
  for (const network of networks) {
    await registryTreeService.compute(registryTreeName, network, {
      sendOnChain,
      dryRun,
    });
  }
};

export const makeGroupsAvailableCmd = new SismoHubCmd("make-groups-available");
makeGroupsAvailableCmd.arguments("attester-name");
makeGroupsAvailableCmd.arguments("<network...>");
makeGroupsAvailableCmd.addOption(
  new Option("-s, --send-on-chain", "send available groups on chain")
);
makeGroupsAvailableCmd.addOption(
  new Option("-d, --dry-run", "Dry run mode. Don't save anything and don't send on chain")
);
makeGroupsAvailableCmd.action(computeRegistryTree);
