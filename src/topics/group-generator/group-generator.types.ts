import { Group } from "../group";

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

export type GeneratorContext = {
  blockNumber: number;
  timestamp: number;
};

export type GeneratorFn = (context: GeneratorContext) => Promise<Group[]>;
