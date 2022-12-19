export enum Network {
  Test = "test",
  Local = "local",
  Goerli = "goerli",
  Mainnet = "mainnet",
  Gnosis = "gnosis",
  Polygon = "polygon",
  Mumbai = "mumbai",
}

export const networkChainIds: { [network in Network]: number } = {
  [Network.Test]: 123456,
  [Network.Local]: 31337,
  [Network.Goerli]: 5,
  [Network.Mainnet]: 1,
  [Network.Gnosis]: 100,
  [Network.Polygon]: 137,
  [Network.Mumbai]: 80001,
};
