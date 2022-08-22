import { Option } from "commander";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { Network } from "topics/attester";

type AttesterComputeOptions = Pick<
  GlobalOptions,
  | "attesterLibrary"
  | "availableDataStore"
  | "availableGroupStore"
  | "groupStore"
> & { sendOnChain: boolean };

export const computeAttester = async (
  attesterName: string,
  networks: Network[],
  {
    attesterLibrary,
    availableDataStore,
    availableGroupStore,
    groupStore,
    sendOnChain,
  }: AttesterComputeOptions
): Promise<void> => {
  const attester = attesterLibrary.create(attesterName, {
    availableDataStore,
    availableGroupStore,
    groupStore,
  });
  for (const network of networks) {
    await attester.compute(network, { sendOnChain: sendOnChain });
  }
};

export const computeAttesterCmd = new DataSourcesCmd("compute-attester");
computeAttesterCmd.arguments("attester-name");
computeAttesterCmd.arguments("<network...>");
computeAttesterCmd.addOption(
  new Option("-s, --send-on-chain", "send available groups on chain")
);
computeAttesterCmd.action(computeAttester);
