import { EthereumResolver } from "./ethereum-resolver";
import { GithubResolver } from "./github-resolver";
import { MemoryResolver } from "./memory-resolver";

export interface IResolver {
  resolve: (rawData: string) => Promise<string>;
}

export type ResolverFactory = {
  [regexp: string]: IResolver;
};

export const resolverFactory: ResolverFactory = {
  "^0x": new EthereumResolver(),
  "^github:": new GithubResolver(process.env.GITHUB_TOKEN),
};

export const testResolverFactory: ResolverFactory = {
  "^test:": new MemoryResolver(),
  "^0x": new EthereumResolver(),
};
