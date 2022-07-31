import { GenerationContext } from "../generation-context";
import { GroupStore, GroupWithData } from "../group";
import { GenerationFrequency } from "./group-generator.types";

export abstract class GroupGenerator {
  public abstract generationFrequency: GenerationFrequency;
  public abstract generate(
    context: GenerationContext
  ): Promise<GroupWithData[]>;

  protected groupStore: GroupStore;

  constructor(groupStore: GroupStore) {
    this.groupStore = groupStore;
  }
}
