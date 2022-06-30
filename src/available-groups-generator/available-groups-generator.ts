import {
  GenerationFrequency,
  GeneratorFn,
  GroupGeneratorConstructor,
} from "./available-groups-generator.types";

export class AvailableGroupsGenerator {
  public name: string;
  public generationFrequency: GenerationFrequency;
  public generate?: GeneratorFn;

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
