export enum Network {
  Test = "test",
  Local = "local",
  Goerli = "goerli",
  Mainnet = "mainnet",
  Gnosis = "gnosis",
  Polygon = "polygon",
  Mumbai = "mumbai",
  ScrollTestnet = "scroll-testnet",
}

export const networkChainIds: { [network in Network]: number } = {
  [Network.Test]: 123456,
  [Network.Local]: 31337,
  [Network.Goerli]: 5,
  [Network.Mainnet]: 1,
  [Network.Gnosis]: 100,
  [Network.Polygon]: 137,
  [Network.Mumbai]: 80001,
  [Network.ScrollTestnet]: 534353,
};

export const networkRpcUrls: { [network in Network]?: string } = {
  [Network.Gnosis]: "https://rpc.gnosis.gateway.fm",
  [Network.Polygon]: "https://polygon-rpc.com",
  [Network.Mumbai]: "https://matic-mumbai.chainstacklabs.com",
  [Network.ScrollTestnet]: "https://alpha-rpc.scroll.io/l2"
};
