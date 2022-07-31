import { GenerationContext } from "../generation-context";
import { GroupStore, GroupWithData } from "../group";
import { GenerationFrequency } from "./group-generator.types";

export class GroupGenerator {
  public generationFrequency: GenerationFrequency;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public generate(context: GenerationContext): Promise<GroupWithData[]> {
    throw Error("generate function must be implemented");
  }

  protected groupStore: GroupStore;

  constructor(groupStore: GroupStore) {
    this.groupStore = groupStore;
  }
}
