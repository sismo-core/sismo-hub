import { LocalFileStore } from "infrastructure/file-store";
import { AvailableDataStore, AvailableData } from "topics/available-data";

export class LocalAvailableDataStore extends AvailableDataStore {
  localFileStore: LocalFileStore;

  constructor(diskPath?: string) {
    super();
    this.localFileStore = new LocalFileStore("available-data", diskPath);
  }

  async all(): Promise<AvailableData[]> {
    const availableData: AvailableData[] = [];
    for (const registryTreeName of await this.localFileStore.list("./")) {
      for (const filename of await this.localFileStore.list(registryTreeName)) {
        availableData.push(await this.load(`${registryTreeName}/${filename}`));
      }
    }
    return availableData;
  }

  async load(filename: string): Promise<AvailableData> {
    return await this.localFileStore.read(filename);
  }

  static filename(availableData: AvailableData) {
    return `${availableData.registryTreeName}/${availableData.network}-${availableData.timestamp}.json`;
  }

  async save(availableData: AvailableData): Promise<void> {
    await this.localFileStore.write(LocalAvailableDataStore.filename(availableData), availableData);
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }
}
