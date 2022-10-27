import { EnsResolver } from "./ens-resolver";
import { EthereumResolver } from "./ethereum-resolver";
import { GithubResolver } from "./github-resolver";
import { LensResolver } from "./lens-resolver";
import { MemoryResolver } from "./memory-resolver";

export interface IResolver {
  resolve: (rawData: string) => Promise<string>;
}

export type ResolverFactory = {
  [regexp: string]: IResolver;
};

export const resolverFactory: ResolverFactory = {
  "^github:": new GithubResolver(process.env.GITHUB_TOKEN),
  ".eth$": new EnsResolver(process.env.JSON_RPC_URL),
  ".lens$": new LensResolver(),
  "^0x": new EthereumResolver(),
};

export const testResolverFactory: ResolverFactory = {
  "^test:": new MemoryResolver(),
  "^0x": new EthereumResolver(),
};
