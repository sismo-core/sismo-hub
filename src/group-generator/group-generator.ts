import {
  GenerationFrequency,
  GeneratorFn,
  GroupGeneratorConstructor,
} from "./group-generator.types";

export class GroupGenerator {
  public generationFrequency: GenerationFrequency;
  public generate: GeneratorFn;

  constructor({
    generationFrequency,
    generate,
  }: GroupGeneratorConstructor) {
    this.generationFrequency = generationFrequency;
    this.generate = generate;
  }
}
