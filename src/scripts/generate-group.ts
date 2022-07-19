import { createContext, GenerationContext } from "../topics/generation-context";
import Infrastructure from "../infrastructure";
import GroupGeneratorLibrary from "../topics/group-generator/group-generator-library";
import { getGenerators } from "../../group-generators/generators";
import { Group } from "../topics/group";

createContext({}).then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }
  await Infrastructure.init();
  GroupGeneratorLibrary.init(getGenerators());

  const generator = GroupGeneratorLibrary.getGenerator(generatorName);

  const groups = await generator.generate(generationContext);
  console.log(`Groups generated!`);
  for (const groupType of groups) {
    const group = new Group(groupType);
    await group.save();
    console.log(`Group saved to "disk-store/groups/${group.filename()}.json"!`);
  }
});
