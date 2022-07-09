import {
  GenerationFrequency,
  GeneratorFn,
  GroupGeneratorConstructor,
} from "./group-generator.types";

export class GroupGenerator {
  public name: string;
  public generationFrequency: GenerationFrequency;
  public generate: GeneratorFn;

  constructor({
    name,
    generationFrequency,
    generate,
  }: GroupGeneratorConstructor) {
    this.name = name;
    this.generationFrequency = generationFrequency;
    this.generate = generate;
  }
}
