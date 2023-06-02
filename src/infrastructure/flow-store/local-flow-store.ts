import { LocalFileStore } from "infrastructure/file-store";
import { Flow } from "topics/flow";
import { FlowStore } from "topics/flow/flow.store";

export class LocalFlowStore extends FlowStore {
  localFileStore: LocalFileStore;

  constructor(diskPath?: string) {
    super();
    this.localFileStore = new LocalFileStore("flow", diskPath);
  }

  async all(): Promise<Flow[]> {
    const flows: Flow[] = [];
    for (const filename of await this.localFileStore.list("./")) {
        flows.push(
          await this.load(`${filename}`)
        );
    }
    return flows;
  }

  async load(filename: string): Promise<Flow> {
    return await this.localFileStore.read(filename);
  }

  static filename(flow: Flow) {
    return `${flow.path}.json`;
  }

  async updateAll(flows: Flow[]): Promise<void> {
    await this.localFileStore.reset();
    for (const flow of flows) {
        await this.localFileStore.write(
          LocalFlowStore.filename(flow),
          flow
        );
    }
  }

  async reset(): Promise<void> {
    this.localFileStore.reset();
  }
}
