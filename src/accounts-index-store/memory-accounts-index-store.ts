import { AccountsIndexStore } from "./accounts-index-store";
import { Account, Result } from "./accounts-index-store.types";

export class MemoryAccountsIndexStore implements AccountsIndexStore {
  
  public async index(accounts: Account[]): Promise<Result> {
    return {
      total: accounts.length,
    };
  }

  public async search(accountIdentifier: string): Promise<Account> {
    return {
      accountIdentifier: accountIdentifier,
      groupIds: []
    }
  }
}