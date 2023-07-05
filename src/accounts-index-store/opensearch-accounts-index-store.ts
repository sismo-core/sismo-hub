import { Client } from "@opensearch-project/opensearch";
import { AccountsIndexStore } from "./accounts-index-store";
import { Account } from "./accounts-index-store.types";

export class OpenSearchAccountsIndexStore extends AccountsIndexStore {
  private _client: Client;

  public async index(account: Account): Promise<void> {
    await this._init();
    await this._client.index({
      index: "accounts",
      body: account
    });
  }

  public async search(accountIdentifier: string): Promise<void> {
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
  }

  private async _init(): Promise<void> {
    if (!this._client) {
      this._client = new Client({
        node: "https://admin:admin@localhost:9200"
      });
      await this._createIndex();
    }
  }

  private async _createIndex(): Promise<void> {
    const settings = {
      settings: {
        index: {
          number_of_shards: 4,
          number_of_replicas: 3,
        },
      },
    };
    
    const response = await this._client.indices.create({
      index: "accounts",
      body: settings,
    });
    
    console.log(JSON.stringify(response));
  }
}