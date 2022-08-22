import { AvailableDataStore, AvailableData } from "topics/available-data";

export class MemoryAvailableDataStore extends AvailableDataStore {
  protected _store: { [key: string]: AvailableData } = {};

  async all(): Promise<AvailableData[]> {
    return Object.values(this._store);
  }

  async reset(): Promise<void> {
    this._store = {};
  }

  async save(availableData: AvailableData): Promise<void> {
    this._store[
      `${availableData.attesterName}/${availableData.network}-${availableData.timestamp}`
    ] = availableData;
  }
}
