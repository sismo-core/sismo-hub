import { AccountsIndexStore } from "./accounts-index-store";
import { Account } from "./accounts-index-store.types";

export class InMemoryAccountsIndexStore extends AccountsIndexStore {
  
  public async index(account: Account): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async search(accountIdentifier: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}