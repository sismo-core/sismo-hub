import { createContext, GenerationContext } from "../topics/generation-context";
import Infrastructure from "../infrastructure";
import GroupGeneratorLibrary from "../topics/group-generator/group-generator-library";
import { getGenerators } from "../../group-generators/generators";

createContext({}).then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }
  await Infrastructure.init();
  GroupGeneratorLibrary.init(getGenerators(generationContext));

  const generator = GroupGeneratorLibrary.getGenerator(generatorName);

  const groups = await generator.generate();
  console.log(`Groups generated!`);
  for (const group of groups) {
    await group.save();
    console.log(`Group saved to "disk-store/groups/${group.filename()}.json"!`);
  }
});
