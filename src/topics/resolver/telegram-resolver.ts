import { BigNumberish } from "ethers";
import { Api, TelegramClient } from "telegram";
import { LogLevel } from "telegram/extensions/Logger";
import { StringSession } from "telegram/sessions";
import { IResolver } from "./resolver";
import {
  resolveAccount,
  withConcurrency,
  handleResolvingErrors,
} from "./utils";
import { FetchedData } from "topics/group";

export class TelegramResolver implements IResolver {
  private _apiHash: string;
  private _apiId: string;
  private _botSession: string | undefined;
  private _botToken: string;
  private _client: TelegramClient;

  constructor(
    apiHash = process.env.TELEGRAM_API_HASH || "",
    apiId = process.env.TELEGRAM_API_ID || "",
    botToken = process.env.TELEGRAM_BOT_TOKEN || "",
    botSession = process.env.TELEGRAM_BOT_SESSION
  ) {
    this._apiHash = apiHash;
    this._apiId = apiId;
    this._botSession = botSession;
    this._botToken = botToken;
  }

  public resolve = async (
    accounts: FetchedData
  ): Promise<[FetchedData, FetchedData]> => {
    const alreadyUpdatedAccounts: FetchedData = {};
    const alreadyResolvedAccounts: FetchedData = {};

    // extract usernames already resolved
    const unresolvedAccounts = Object.entries(accounts).filter(
      ([account, value]) => {
        if (account.split(":").length === 3) {
          const id = account.split(":")[2];
          alreadyResolvedAccounts[resolveAccount("1003", id)] = value;
          alreadyUpdatedAccounts[account] = value;
        }
        return account.split(":").length !== 3;
      }
    );

    await this._connect();
    const resolvedAccountsArrays = await withConcurrency(
      unresolvedAccounts,
      this.resolveAccounts,
      {
        concurrency: 10,
        batchSize: 1,
      }
    );
    await this._client.disconnect();

    // merge already resolved accounts with the new ones
    const resolvedAccountsRaw = {
      ...resolvedAccountsArrays[0],
      ...alreadyUpdatedAccounts,
    };
    const resolvedAccounts = {
      ...resolvedAccountsArrays[1],
      ...alreadyResolvedAccounts,
    };

    return [resolvedAccountsRaw, resolvedAccounts];
  };

  private _connect = async () => {
    if (this._client === undefined) {
      this._client = new TelegramClient(
        new StringSession(this._botSession), +this._apiId, this._apiHash, {}
      );
    }
    this._client.setLogLevel(LogLevel.ERROR);
    await this._signInIfNeeded();
    await this._client.connect();
  };

  /**
   * To avoid FLOOD_WAIT errors, we need to limit the number of bot authorisations
   * Since the bot session never expires, we can can save it once and then use it forever
   * Take the result of session.save() and save it into env.TELEGRAM_BOT_SESSION
   * 
   * Note: The return type of session.save() is void but it returns the sesssion string
   */
  private _signInIfNeeded = async () => {
    if (!this._botSession) {
      await this._client.start({
        botAuthToken: this._botToken,
      });
      this._client.session.save();
    }
  };

  private resolveAccounts = async (
    accounts: [string, BigNumberish][]
  ): Promise<[FetchedData, FetchedData]> => {
    const updatedAccounts: FetchedData = {};
    const resolvedAccounts: FetchedData = {};

    const prefix = accounts[0][0].split(":")[0];

    // remove 'telegram:' from the accounts
    const accountsWithoutType: [string, BigNumberish][] = accounts.map(
      (accountWithType) => {
        return [accountWithType[0].split(":")[1], accountWithType[1]];
      }
    );

    // get only the telegram usernames
    const usernames = accountsWithoutType.map((accountWithoutType) => {
      return accountWithoutType[0];
    });
    const res = await this.resolveHandlesQuery(usernames);

    res.forEach((peer: Api.contacts.ResolvedPeer) => {
      try {
        const user = peer.users[0] as Api.User
        const account = accountsWithoutType.find(
          ([account]) => account === user.username
        );
        if (account) {
          resolvedAccounts[resolveAccount("1003", user.id.toString())] = account[1];
          updatedAccounts[prefix + ":" + user.username] = account[1];
        }
      } catch (error) {
        handleResolvingErrors(
          `Error processing account: ${JSON.stringify(peer.toJSON())}`
        );
      }
    });

    return [updatedAccounts, resolvedAccounts];
  }

  private resolveHandlesQuery = async (
    usernames: string[]
  ): Promise<Api.contacts.ResolvedPeer[]> => {
    const resolved = new Array<Api.contacts.ResolvedPeer>();
    for (const username of usernames) {
      try {
        const result = await this._client.invoke(
          new Api.contacts.ResolveUsername({
            username: username
          })
        );
        resolved.push(result);
      } catch (error) {
        handleResolvingErrors(
          `Error while fetching ${username}. Is it an existing Telegram username?`
        );
      }
    }
    return resolved;
  }
}