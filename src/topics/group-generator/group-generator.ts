import { GenerationFrequency } from "./group-generator.types";
import { GenerationContext } from "../generation-context";
import { Group } from "../group";

export abstract class GroupGenerator {
  public abstract generate(): Promise<Group[]>;
  public abstract generationFrequency: GenerationFrequency;

  protected context: GenerationContext;

  public constructor(context: GenerationContext) {
    this.context = context;
  }
}
