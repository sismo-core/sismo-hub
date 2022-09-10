/* istanbul ignore file */
import { Option } from "commander";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";
import { Network } from "topics/attester";

type AttesterComputeOptions = Pick<
  GlobalOptions,
  "availableDataStore" | "availableGroupStore" | "groupStore"
> & { sendOnChain: boolean; env: ConfigurationDefaultEnv };

export const computeAttester = async (
  attesterName: string,
  networks: Network[],
  {
    env,
    availableDataStore,
    availableGroupStore,
    groupStore,
    sendOnChain,
  }: AttesterComputeOptions
): Promise<void> => {
  const attesterService = ServiceFactory.withDefault(env, {
    availableDataStore,
    availableGroupStore,
    groupStore,
  }).getAttesterService();
  for (const network of networks) {
    await attesterService.compute(attesterName, network, { sendOnChain });
  }
};

export const computeAttesterCmd = new DataSourcesCmd("compute-attester");
computeAttesterCmd.arguments("attester-name");
computeAttesterCmd.arguments("<network...>");
computeAttesterCmd.addOption(
  new Option("-s, --send-on-chain", "send available groups on chain")
);
computeAttesterCmd.action(computeAttester);
