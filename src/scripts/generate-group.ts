import { createContext, GenerationContext } from "../topics/generation-context";
import { generators } from "../../group-generators/generators";
import { GroupGenerator } from "../topics/group-generator";
import { LocalGroupStore } from "../infrastructure/group-store";

createContext({}).then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }

  const groupStore = new LocalGroupStore();
  const generator: GroupGenerator = new generators[generatorName](groupStore);
  const groups = await generator.generate(generationContext);
  console.log(`Groups generated!`);
  for (const group of groups) {
    await groupStore.save(group);
  }
});
