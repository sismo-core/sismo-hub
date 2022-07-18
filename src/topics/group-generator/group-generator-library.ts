import { GroupGenerator } from "./group-generator";

export default class GroupGeneratorLibrary {
  protected static _library?: { [name: string]: GroupGenerator };

  public static get generators(): { [name: string]: GroupGenerator } {
    if (!GroupGeneratorLibrary._library) {
      throw Error("GroupGeneratorLibrary must be set before use!");
    }
    return GroupGeneratorLibrary._library;
  }

  public static init(generators: { [name: string]: GroupGenerator }): void {
    GroupGeneratorLibrary._library = generators;
  }

  public static getGenerator(generatorName: string): GroupGenerator {
    return GroupGeneratorLibrary.generators[generatorName];
  }

  public static reset() {
    GroupGeneratorLibrary._library = undefined;
  }
}
