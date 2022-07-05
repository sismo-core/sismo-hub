import { Group } from "../group";
import { getGroups } from "../helpers/data-sources-api";
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

  public async getLatestGroup(): Promise<Group> {
    const groups = await getGroups({
      generatorName: this.name,
      timestamp: "latest",
    });
    const latestGroup = groups[0];
    if (!latestGroup) {
      throw new Error(`Latest group not found for generator ${this.name}!`);
    }
    return latestGroup;
  }
}
