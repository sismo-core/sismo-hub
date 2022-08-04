import { getGenerator } from "@group-generators/generators";
import { LocalGroupStore } from "infrastructure/group-store";
import { createContext, GenerationContext } from "topics/generation-context";
import { GroupGenerator } from "topics/group-generator";

createContext({}).then(async (generationContext: GenerationContext) => {
  const generatorName: string = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }
  const groupStore = new LocalGroupStore();
  const generator: GroupGenerator = getGenerator(generatorName, groupStore);
  const groups = await generator.generate(generationContext);
  console.log(`Groups generated!`);
  for (const group of groups) {
    await groupStore.save(group);
  }
});
