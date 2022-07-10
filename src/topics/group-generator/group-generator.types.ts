import { Group } from "../group";
import { GenerationContext } from "../generation-context";

export type GroupGeneratorConstructor = {
  generationFrequency: GenerationFrequency;
  generate: GeneratorFn;
};

export enum GenerationFrequency {
  Once = "Once",
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
}

export type GeneratorFn = (context: GenerationContext) => Promise<Group[]>;
