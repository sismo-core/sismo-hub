import { BigNumberish } from "ethers";
import { Api, TelegramClient } from "telegram";
import { LogLevel } from "telegram/extensions/Logger";
import { StringSession } from "telegram/sessions";
import { IResolver } from "./resolver";
import { resolveAccount, withConcurrency, handleResolvingErrors, mergeWithMax } from "./utils";
import { AccountType, FetchedData } from "topics/group";

export class TelegramResolver implements IResolver {
  private _apiHash: string;
  private _apiId: string;
  private _botSession: string | undefined;
  private _client: TelegramClient;

  constructor(
    apiHash = process.env.TELEGRAM_API_HASH || "",
    apiId = process.env.TELEGRAM_API_ID || "",
    botSession = process.env.TELEGRAM_BOT_SESSION
  ) {
    this._apiHash = apiHash;
    this._apiId = apiId;
    this._botSession = botSession;
  }

  public resolve = async (
    accounts: FetchedData
  ): Promise<{
    accountSources: string[];
    resolvedAccountsRaw: FetchedData;
    resolvedAccounts: FetchedData;
  }> => {
    const alreadyUpdatedAccounts: FetchedData = {};
    const alreadyResolvedAccounts: FetchedData = {};

    // extract usernames already resolved
    const unresolvedAccounts = Object.entries(accounts).filter(([account, value]) => {
      if (account.split(":").length === 3) {
        const id = account.split(":")[2];
        alreadyResolvedAccounts[resolveAccount("1003", id)] = value;
        alreadyUpdatedAccounts[account] = value;
      }
      return account.split(":").length !== 3;
    });

    await this._connect();
    const resolvedAccountsArrays = await withConcurrency(unresolvedAccounts, this.resolveAccounts, {
      concurrency: 10,
      batchSize: 1,
    });
    await this._client.disconnect();

    const resolvedAccountsRaw = mergeWithMax(resolvedAccountsArrays[0], alreadyUpdatedAccounts);
    const resolvedAccounts = mergeWithMax(resolvedAccountsArrays[1], alreadyResolvedAccounts);

    return {
      accountSources: [AccountType.TELEGRAM],
      resolvedAccountsRaw,
      resolvedAccounts,
    };
  };

  private _connect = async () => {
    if (this._client === undefined) {
      this._client = new TelegramClient(
        new StringSession(this._botSession),
        +this._apiId,
        this._apiHash,
        {}
      );
    }
    this._client.setLogLevel(LogLevel.ERROR);
    await this._client.connect();
  };

  private resolveAccounts = async (
    accounts: [string, BigNumberish][]
  ): Promise<[FetchedData, FetchedData]> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    const prefix = accounts[0][0].split(":")[0];

    // remove 'telegram:' from the accounts
    const accountsWithoutType: [string, BigNumberish][] = accounts.map((accountWithType) => {
      return [accountWithType[0].split(":")[1], accountWithType[1]];
    });

    // get only the telegram usernames
    const usernames = accountsWithoutType.map((accountWithoutType) => {
      return accountWithoutType[0];
    });
    const res = await this.resolveHandlesQuery(usernames);

    res.forEach((peer: Api.contacts.ResolvedPeer) => {
      try {
        const user = peer.users[0] as Api.User;
        const account = accountsWithoutType.find(
          ([account]) => account.toLowerCase() === user.username?.toLowerCase()
        );
        if (account) {
          resolvedAccounts[resolveAccount("1003", user.id.toString())] = account[1];
          updatedAccounts[prefix + ":" + user.username] = account[1];
        }
      } catch (error) {
        handleResolvingErrors(`Error processing account: ${JSON.stringify(peer.toJSON())}`);
      }
    });
    // if some accounts haven't been resolved
    if (Object.keys(resolvedAccounts).length < Object.keys(accounts).length) {
      const accountsNotResolved = accounts
        .filter(([account]) => !Object.entries(resolvedAccounts).find(([acc]) => acc === account))
        .map(([account]) => account);
      handleResolvingErrors(
        `Error on these Telegram usernames: ${accountsNotResolved.join(
          ", "
        )}. Are they existing Telegram usernames?`
      );
    }
    return [updatedAccounts, resolvedAccounts];
  };

  private resolveHandlesQuery = async (
    usernames: string[]
  ): Promise<Api.contacts.ResolvedPeer[]> => {
    const resolved = new Array<Api.contacts.ResolvedPeer>();
    for (const username of usernames) {
      try {
        const result = await this._client.invoke(
          new Api.contacts.ResolveUsername({
            username: username,
          })
        );
        resolved.push(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        handleResolvingErrors(
          `Error while fetching ${username}. Is it an existing Telegram username? Error: ${errorMessage}`
        );
      }
    }
    return resolved;
  };
}
