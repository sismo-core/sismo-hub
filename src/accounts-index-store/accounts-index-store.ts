import { Account } from "./accounts-index-store.types";

export abstract class AccountsIndexStore {
  public abstract index(account: Account): Promise<void>;
  public abstract search(accountIdentifier: string): Promise<void>;
}