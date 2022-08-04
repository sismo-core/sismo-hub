import { GenerationFrequency } from "./group-generator.types";
import { GenerationContext } from "topics/generation-context";
import { GroupStore, GroupWithData } from "topics/group";

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
