import { Network } from "topics/registry-tree";

export type AvailableData = {
  registryTreeName: string;
  timestamp: number;
  network: Network;
  identifier: string;
  isOnChain: boolean;
  transactionHash?: string;
};

export type AvailableDataSearch = {
  registryTreeName: string;
  network: Network;
  latest?: boolean;
  isOnChain?: boolean;
};

export abstract class AvailableDataStore {
  public abstract all(): Promise<AvailableData[]>;
  public abstract reset(): Promise<void>;
  public abstract save(availableData: AvailableData): Promise<void>;

  public async search({
    registryTreeName,
    network,
    latest,
    isOnChain,
  }: AvailableDataSearch): Promise<AvailableData[]> {
    let availableData = (await this.all()).filter(
      (availableData) =>
        availableData.registryTreeName == registryTreeName && availableData.network == network
    );

    availableData =
      isOnChain === undefined
        ? availableData
        : availableData.filter((availableData) => availableData.isOnChain == isOnChain);

    return latest ? this._latest(availableData) : availableData;
  }

  protected _latest(availableData: AvailableData[]) {
    if (availableData.length == 0) {
      return [];
    }
    let latest = availableData[0];
    for (const item of availableData) {
      if (item.timestamp > latest.timestamp) {
        latest = item;
      }
    }
    return [latest];
  }
}
