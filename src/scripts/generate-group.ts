import { createContext, GenerationContext } from "../topics/generation-context";
import Infrastructure from "../infrastructure";

import { Group } from "../topics/group";
import { getGroupGenerator } from "../../group-generators/generators";

createContext({}).then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }
  await Infrastructure.init();
  const generator = getGroupGenerator(generatorName);

  const groups = await generator.generate(generationContext);
  console.log(`Groups generated!`);
  for (const group of groups) {
    await group.save();
    console.log(`Group saved to "disk-store/${group.filename()}"!`);
  }
  console.log("all");
  console.log(await Group.store.all());
  console.log("latest");
  console.log(
    await Group.store.search({ groupName: "ens-voters", latest: true })
  );
  console.log("not latest");
  console.log(
    await Group.store.search({ groupName: "ens-voters", latest: false })
  );
});
