import { GroupStore, GroupWithData } from "topics/group";

export enum GenerationFrequency {
  Once = "Once",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export type GenerationContext = {
  blockNumber: number;
  timestamp: number;
};

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
