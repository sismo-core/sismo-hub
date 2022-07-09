import { GroupGenerator } from "../../src/group-generator";

export const getGroupGenerator = async (generatorName: string) : Promise<GroupGenerator> => {
  return (await import(`./${generatorName}`)).default;
}
