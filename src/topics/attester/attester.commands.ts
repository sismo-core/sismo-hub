/* istanbul ignore file */
import { Option } from "commander";
import { attesters } from "@attestations-collections/index";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { AttesterService, Network } from "topics/attester";

type AttesterComputeOptions = Pick<
  GlobalOptions,
  "availableDataStore" | "availableGroupStore" | "groupStore"
> & { sendOnChain: boolean };

export const computeAttester = async (
  attesterName: string,
  networks: Network[],
  {
    availableDataStore,
    availableGroupStore,
    groupStore,
    sendOnChain,
  }: AttesterComputeOptions
): Promise<void> => {
  const attesterService = new AttesterService({
    attesters,
    availableDataStore,
    availableGroupStore,
    groupStore,
  });
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
