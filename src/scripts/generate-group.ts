import generators from "../../group-generators/generators";
import { createContext, GenerationContext } from "../helpers/utils/generation-context";

import { Group } from "../group"

createContext().then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }
  const generator = generators.find(
    (generator) => generator.name === generatorName
  );
  if (!generator) {
    throw new Error(`Generator ${generatorName} not found!`);
  }

  const group = await generator.generate(generationContext);
  console.log(`Group generated!`);
  await group.save()
  console.log(`Group saved to "disk-store/${group.filename()}"!`)
  console.log("all")
  console.log(await Group.store.all("ens-voters"))
  console.log("latest")
  console.log(await Group.store.search({groupName: "ens-voters", latest: true}))
  console.log("not latest")
  console.log(await Group.store.search({groupName: "ens-voters", latest: false}))
});
