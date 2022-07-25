import "reflect-metadata";
import { DependencyContainer } from "tsyringe";
import { createContext, GenerationContext } from "../topics/generation-context";
import { getLocalContainer } from "../infrastructure";
import { getGenerator } from "../../group-generators/generators";
import { Group } from "../topics/group";
import { GroupGenerator } from "../topics/group-generator";

createContext({}).then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }

  const container: DependencyContainer = getLocalContainer();
  const generator: GroupGenerator = getGenerator(container, generatorName);
  const groups = await generator.generate(generationContext);
  console.log(`Groups generated!`);
  for (const groupType of groups) {
    const group = Group.create(container, groupType);
    await group.save();
    console.log(`Group saved to "disk-store/groups/${group.filename}.json"!`);
  }
});
