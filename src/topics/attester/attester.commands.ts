import { DataSourcesCmd, GlobalOptions } from "cli/command";

type AttesterComputeOptions = Pick<
  GlobalOptions,
  | "attesterLibrary"
  | "availableDataStore"
  | "availableGroupStore"
  | "groupStore"
>;

export const computeAttester = async (
  attesterName: string,
  {
    attesterLibrary,
    availableDataStore,
    availableGroupStore,
    groupStore,
  }: AttesterComputeOptions
): Promise<void> => {
  const attester = attesterLibrary.create(
    attesterName,
    availableDataStore,
    availableGroupStore,
    groupStore
  );
  await attester.compute();
};

export const computeAttesterCmd = new DataSourcesCmd("compute-attester");
computeAttesterCmd.arguments("attester-name");
computeAttesterCmd.action(computeAttester);
