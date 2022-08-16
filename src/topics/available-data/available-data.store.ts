export type AvailableGroupsMetadata = {
  url: string;
};

export type AvailableData = {
  attesterName: string;
  timestamp: number;
  metadata: AvailableGroupsMetadata;
};

export type AvailableDataSearch = {
  attesterName: string;
  latest?: boolean;
};

export abstract class AvailableDataStore {
  public abstract all(): Promise<AvailableData[]>;
  public abstract reset(): Promise<void>;
  public abstract save(availableData: AvailableData): Promise<void>;

  public async search({
    attesterName,
    latest,
  }: AvailableDataSearch): Promise<AvailableData[]> {
    const availableData = (await this.all()).filter(
      (availableData) => availableData.attesterName == attesterName
    );
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
