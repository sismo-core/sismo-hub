import { EnsResolver } from "./ens-resolver";
import { EthereumResolver } from "./ethereum-resolver";
import { GithubResolver } from "./github-resolver";
import { LensResolver } from "./lens-resolver";
import { MemoryResolver } from "./memory-resolver";
import { TelegramResolver } from "./telegram-resolver";
import { TwitterResolver } from "./twitter-resolver";
import { VaultResolver } from "./vault-resolver";
import { AccountType, FetchedData } from "topics/group";

export interface IResolver {
  resolve: (rawData: FetchedData) => Promise<{
    accountSources: string[];
    resolvedAccountsRaw: FetchedData;
    resolvedAccounts: FetchedData;
  }>;
}

export type ResolverFactory = {
  [regexp: string]: {
    resolver: IResolver;
    accountType: AccountType;
  };
};

export const resolverFactory: ResolverFactory = {
  "^github:": {
    resolver: new GithubResolver(process.env.SH_GITHUB_TOKEN),
    accountType: AccountType.GITHUB,
  },
  "^telegram:": {
    resolver: new TelegramResolver(
      process.env.TELEGRAM_API_HASH,
      process.env.TELEGRAM_API_ID,
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_BOT_SESSION
    ),
    accountSource: AccountSource.TELEGRAM,
    accountType: AccountType.TELEGRAM,
  },
  "^twitter:": {
    resolver: new TwitterResolver(process.env.TWITTER_API_KEY),
    accountType: AccountType.TWITTER,
  },
  "^vault/": {
    resolver: new VaultResolver(),
    accountType: AccountType.VAULT,
  },
  "\\.eth$": {
    resolver: new EnsResolver(process.env.JSON_RPC_URL),
    accountType: AccountType.ENS,
  },
  "\\.lens$": {
    resolver: new LensResolver(),
    accountType: AccountType.LENS,
  },
  "^0x[a-fA-F0-9]{40}$": {
    resolver: new EthereumResolver(),
    accountType: AccountType.ETHEREUM,
  },
};

export const testResolverFactory: ResolverFactory = {
  "^test:": {
    resolver: new MemoryResolver(),
    accountType: AccountType.TEST,
  },
  "^0x[a-fA-F0-9]{40}$": {
    resolver: new EthereumResolver(),
    accountType: AccountType.ETHEREUM,
  },
};
