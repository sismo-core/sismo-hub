import { AccountsIndexerService } from "./accounts-indexer";
import { GlobalOptions, SismoHubCmd } from "cli/command";

type IndexAccountsOptions =  Pick<
  GlobalOptions,
  "accountsIndexStore" | "groupStore" | "groupSnapshotStore" | "logger"
>

export const indexAccounts = async (
  {
    accountsIndexStore,
    groupStore,
    groupSnapshotStore,
    logger,
  } : IndexAccountsOptions
): Promise<void> => {
  const service = new AccountsIndexerService({
    accountsIndexStore,
    groupStore,
    groupSnapshotStore,
    logger,
  });

  await service.indexGroups();
};

export const indexAccountsCmd = new SismoHubCmd("index-accounts");
indexAccountsCmd.action(indexAccounts);
