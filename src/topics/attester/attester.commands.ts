import { Option } from "commander";
import { attesterLibrary } from "@attesters/index";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { ClassLibrary } from "helpers";
import { Attester, Network } from "topics/attester";

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
  }: AttesterComputeOptions,
  /* istanbul ignore next */
  attesters: ClassLibrary<Attester> = attesterLibrary
): Promise<void> => {
  const attester = attesters.create(attesterName, {
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
