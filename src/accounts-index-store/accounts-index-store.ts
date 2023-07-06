import { Account, Result } from "./accounts-index-store.types";

export interface AccountsIndexStore {
  index(accounts: Account[]): Promise<Result>;
  search(accountIdentifier: string): Promise<Account>;
}