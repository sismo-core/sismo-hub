/* istanbul ignore file */
import { Option } from "commander";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";
import { Network } from "topics/attester";

type AttesterComputeOptions = Pick<
  GlobalOptions,
  | "availableDataStore"
  | "availableGroupStore"
  | "groupStore"
  | "groupSnapshotStore"
  | "logger"
> & { sendOnChain: boolean; env: ConfigurationDefaultEnv; dryRun: boolean };

export const computeAttester = async (
  attesterName: string,
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
  }: AttesterComputeOptions
): Promise<void> => {
  const attesterService = ServiceFactory.withDefault(env, {
    availableDataStore,
    availableGroupStore,
    groupStore,
    groupSnapshotStore,
    logger,
  }).getAttesterService();
  for (const network of networks) {
    await attesterService.compute(attesterName, network, {
      sendOnChain,
      dryRun,
    });
  }
};

export const computeAttesterCmd = new DataSourcesCmd("send-to-attester");
computeAttesterCmd.arguments("attester-name");
computeAttesterCmd.arguments("<network...>");
computeAttesterCmd.addOption(
  new Option("-s, --send-on-chain", "send available groups on chain")
);
computeAttesterCmd.addOption(
  new Option(
    "-d, --dry-run",
    "Dry run mode. Don't save anything and don't send on chain"
  )
);
computeAttesterCmd.action(computeAttester);
