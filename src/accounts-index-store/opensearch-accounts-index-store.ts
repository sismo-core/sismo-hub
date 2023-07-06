import { Client } from "@opensearch-project/opensearch";
import { AccountsIndexStore } from "./accounts-index-store";
import { Account, Result } from "./accounts-index-store.types";

export class OpenSearchAccountsIndexStore implements AccountsIndexStore {
  private _client: Client;

  private async _init(): Promise<void> {
    if (!this._client) {
      // TODO: proper config
      this._client = new Client({
        node: "https://admin:admin@localhost:9200",
        ssl: {
          rejectUnauthorized: false
        }
      });
    }
  }

  public async index(accounts: Account[]): Promise<Result> {
    await this._init();
    
    const result = await this._client.helpers.bulk({
      datasource: accounts,
      onDocument: (doc) => {
        return {
          index: {
            _index: "accounts",
            _id: doc.accountIdentifier
          }
        };
      }
    });

    return result;
  }

  public async search(accountIdentifier: string): Promise<Account> {
    await this._init();

    const query = {
      query: {
        match: {
          accountIdentifier: {
            query: accountIdentifier,
          },
        },
      },
    };
    
    const response = await this._client.search({
      index: "accounts",
      body: query,
    });

    console.log(JSON.stringify(response));

    return {
      accountIdentifier: "0x000",
      groupIds: []
    }
  }
}