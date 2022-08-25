export enum Network {
  Test = "test",
  Local = "local",
  Mainnet = "mainnet",
  Polygon = "polygon",
}

export const networkChainIds: { [network in Network]: number } = {
  [Network.Test]: 123456,
  [Network.Local]: 31337,
  [Network.Mainnet]: 1,
  [Network.Polygon]: 137,
};
