import { Group } from "../group";
import {
  GenerationFrequency,
  GeneratorFn,
  GroupGeneratorConstructor,
} from "./group-generator.types";
import {getInfrastructureServices} from "../infrastructure"

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
    const groupKeys = (await this.listGroups()).map((key) => Number(key))
    return await getInfrastructureServices().groupDataStore.get(
      this.name,
      Math.max(...groupKeys).toString()
    )
  }

  public async storeGroup(group: Group): Promise<string> {
    return await getInfrastructureServices().groupDataStore.store(
      this.name,
      group.generationDate.getTime().toString(),
      group
    )
  }

  public async listGroups(): Promise<string[]> {
    return await getInfrastructureServices().groupDataStore.list(this.name)
  }
}
