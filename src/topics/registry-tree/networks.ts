export enum Network {
  Test = "test",
  Local = "local",
  Goerli = "goerli",
  Sepolia = "sepolia",
  Mainnet = "mainnet",
  Gnosis = "gnosis",
  Polygon = "polygon",
  Mumbai = "mumbai",
  Optimism = "optimism",
  OptimismGoerli = "optimism-goerli",
  ArbitrumOne = "arbitrum-one",
  ArbitrumGoerli = "arbitrum-goerli",
  ScrollTestnet = "scroll-testnet",
  Base = "base",
  BaseGoerli = "base-goerli",
}

export const networkChainIds: { [network in Network]: number } = {
  [Network.Test]: 123456,
  [Network.Local]: 31337,
  [Network.Goerli]: 5,
  [Network.Sepolia]: 11155111,
  [Network.Mainnet]: 1,
  [Network.Gnosis]: 100,
  [Network.Polygon]: 137,
  [Network.Mumbai]: 80001,
  [Network.Optimism]: 10,
  [Network.OptimismGoerli]: 420,
  [Network.ArbitrumOne]: 42161,
  [Network.ArbitrumGoerli]: 421613,
  [Network.ScrollTestnet]: 534353,
  [Network.Base]: 8453,
  [Network.BaseGoerli]: 84531,
};

export const networkRpcUrls: { [network in Network]?: string } = {
  [Network.ArbitrumOne]: "https://1rpc.io/arb",
  [Network.ArbitrumGoerli]: "https://rpc.goerli.arbitrum.gateway.fm",
  [Network.ScrollTestnet]: "https://alpha-rpc.scroll.io/l2",
  [Network.Base]: "https://mainnet.base.org",
  [Network.BaseGoerli]: "https://goerli.base.org",
};
