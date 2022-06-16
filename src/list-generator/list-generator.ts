import {
  GenerationFrequency,
  GeneratorFn,
  ListGeneratorConstructor,
} from "./list-generator.types";

export class ListGenerator {
  public id: number;
  public name: string;
  public generationFrequency: GenerationFrequency;
  public generate?: GeneratorFn;

  constructor({
    id,
    name,
    generationFrequency,
    generate,
  }: ListGeneratorConstructor) {
    this.id = id;
    this.name = name;
    this.generationFrequency = generationFrequency;
    this.generate = generate;
  }
}
