export enum Network {
  Test = "test",
  Local = "local",
  Rinkeby = "rinkeby",
  Mainnet = "mainnet",
  Polygon = "polygon",
}

export const networkChainIds: { [network in Network]: number } = {
  [Network.Test]: 123456,
  [Network.Local]: 31337,
  [Network.Rinkeby]: 4,
  [Network.Mainnet]: 1,
  [Network.Polygon]: 137,
};
