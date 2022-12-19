import { EnsResolver } from "./ens-resolver";
import { EthereumResolver } from "./ethereum-resolver";
import { GithubResolver } from "./github-resolver";
import { LensResolver } from "./lens-resolver";
import { MemoryResolver } from "./memory-resolver";
import { TwitterResolver } from "./twitter-resolver";
import { AccountSource } from "topics/group";

export interface IResolver {
  resolve: (rawData: string) => Promise<string>;
}

export type ResolverFactory = {
  [regexp: string]: { resolver: IResolver; accountType: AccountSource };
};

export const resolverFactory: ResolverFactory = {
  "^github:": {
    resolver: new GithubResolver(process.env.SH_GITHUB_TOKEN),
    accountType: AccountSource.GITHUB,
  },
  "^twitter:": {
    resolver: new TwitterResolver(
      process.env.TWITTER_API_KEY,
      process.env.HIVE_API_KEY
    ),
    accountType: AccountSource.TWITTER,
  },
  ".eth$": {
    resolver: new EnsResolver(process.env.JSON_RPC_URL),
    accountType: AccountSource.ETHEREUM,
  },
  ".lens$": {
    resolver: new LensResolver(),
    accountType: AccountSource.ETHEREUM,
  },
  "^0x[a-fA-F0-9]{40}$": {
    resolver: new EthereumResolver(),
    accountType: AccountSource.ETHEREUM,
  },
};

export const testResolverFactory: ResolverFactory = {
  "^test:": { resolver: new MemoryResolver(), accountType: AccountSource.TEST },
  "^0x[a-fA-F0-9]{40}$": {
    resolver: new EthereumResolver(),
    accountType: AccountSource.ETHEREUM,
  },
};
