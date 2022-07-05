import { Group } from "../group";
import { getGroups } from "../helpers/data-sources-api";
import { createContext } from "../helpers/utils/generation-context";
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
      const NODE_ENV = process.env.NODE_ENV;
      if (NODE_ENV !== "local") {
        throw new Error(`Latest group not found for generator ${this.name}!`);
      }
      console.log(
        `Latest group not found for generator ${this.name}! Try Generating a group in local.`
      );
      const context = await createContext();
      return this.generate(context);
    }
    return latestGroup;
  }
}
