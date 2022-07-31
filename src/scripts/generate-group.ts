import "reflect-metadata";
import { DependencyContainer } from "tsyringe";
import { createContext, GenerationContext } from "../topics/generation-context";
import { getLocalContainer } from "../infrastructure";
import { getGenerator } from "../../group-generators/generators";
import { GroupGenerator } from "../topics/group-generator";
import { LocalGroupStore } from "../infrastructure/group-store";

createContext({}).then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }

  const container: DependencyContainer = getLocalContainer();
  const groupStore = container.resolve<LocalGroupStore>("GroupStore");
  const generator: GroupGenerator = getGenerator(container, generatorName);
  const groups = await generator.generate(generationContext);
  console.log(`Groups generated!`);
  for (const group of groups) {
    await groupStore.save(group);
  }
});
