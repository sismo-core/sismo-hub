import { GenerationFrequency } from "./group-generator.types";
import { GenerationContext } from "../generation-context";
import { GroupType } from "../group";

export abstract class GroupGenerator {
  public abstract generate(context: GenerationContext): Promise<GroupType[]>;
  public abstract generationFrequency: GenerationFrequency;
}
