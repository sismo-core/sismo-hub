import generators from "../../group-generators/generators";
import { createContext, GenerationContext } from "../utils/generation-context";
import readline from "readline";
import { storeOnDisk } from "../utils/disk";

createContext().then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }
  const generator = generators.find(
    (generator) => generator.name === generatorName
  );
  if (!generator) {
    throw new Error(`Generator ${generatorName} not found !`);
  }

  const group = await generator.generate!(generationContext);
  console.log(`Group generated !`);
  const name = generationContext.timestamp.toString();
  await storeOnDisk(name, group, generatorName);
  readline.clearLine(process.stdout, 0);
  console.log(`Group generated in ./tmp/${generatorName}/${name}.json`);
  process.exit(0);
});
