import {
  GenerationFrequency,
  GeneratorFn,
  GroupGeneratorConstructor,
} from "./group-generator.types";

export class GroupGenerator {
  public id: number;
  public name: string;
  public generationFrequency: GenerationFrequency;
  public generate?: GeneratorFn;

  constructor({
    id,
    name,
    generationFrequency,
    generate,
  }: GroupGeneratorConstructor) {
    this.id = id;
    this.name = name;
    this.generationFrequency = generationFrequency;
    this.generate = generate;
  }
}
