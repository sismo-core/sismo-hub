import { GroupGenerator } from "../../src/topics/group-generator";

export const getGroupGenerator = async (
  generatorName: string
): Promise<GroupGenerator> => {
  return (await import(`./${generatorName}`)).default;
};
