import { EnsResolver } from "./ens-resolver";
import { EthereumResolver } from "./ethereum-resolver";
import { GithubResolver } from "./github-resolver";
import { LensResolver } from "./lens-resolver";
import { MemoryResolver } from "./memory-resolver";
import { TelegramResolver } from "./telegram-resolver";
import { TwitterResolver } from "./twitter-resolver";
import { AccountType, AccountSource, FetchedData } from "topics/group";

export interface IResolver {
  resolve: (rawData: FetchedData) => Promise<[FetchedData, FetchedData]>;
}

export type ResolverFactory = {
  [regexp: string]: {
    resolver: IResolver;
    accountSource: AccountSource;
    accountType: AccountType;
  };
};

export const resolverFactory: ResolverFactory = {
  "^github:": {
    resolver: new GithubResolver(process.env.SH_GITHUB_TOKEN),
    accountSource: AccountSource.GITHUB,
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
    accountSource: AccountSource.TWITTER,
    accountType: AccountType.TWITTER,
  },
  "\\.eth$": {
    resolver: new EnsResolver(process.env.JSON_RPC_URL),
    accountSource: AccountSource.ETHEREUM,
    accountType: AccountType.ENS,
  },
  "\\.lens$": {
    resolver: new LensResolver(),
    accountSource: AccountSource.ETHEREUM,
    accountType: AccountType.LENS,
  },
  "^0x[a-fA-F0-9]{40}$": {
    resolver: new EthereumResolver(),
    accountSource: AccountSource.ETHEREUM,
    accountType: AccountType.ETHEREUM,
  },
};

export const testResolverFactory: ResolverFactory = {
  "^test:": {
    resolver: new MemoryResolver(),
    accountSource: AccountSource.TEST,
    accountType: AccountType.TEST,
  },
  "^0x[a-fA-F0-9]{40}$": {
    resolver: new EthereumResolver(),
    accountSource: AccountSource.ETHEREUM,
    accountType: AccountType.ETHEREUM,
  },
};
