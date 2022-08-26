import { IRootsRegistry } from "@attestations-collections/base/hydra-s1";

export class MemoryRootsRegistry implements IRootsRegistry {
  registry: Set<string> = new Set<string>();

  async register(root: string): Promise<string> {
    this.registry.add(root);
    return "fake_tx";
  }
  async unregister(root: string): Promise<string> {
    this.registry.delete(root);
    return "fake_tx";
  }

  async isAvailable(root: string): Promise<boolean> {
    return this.registry.has(root);
  }
}
