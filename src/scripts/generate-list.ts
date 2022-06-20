import generators from "../../list-generators/generators";
import {
  createContext,
  GenerationContext,
} from "../../src/utils/generation-context";
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

  const list = await generator.generate!(generationContext);
  console.log(`List generated !`);
  const name = generationContext.timestamp.toString();
  await storeOnDisk(name, list, generatorName);
  readline.clearLine(process.stdout, 0);
  console.log(`List generated in ./tmp/${generatorName}/${name}.json`);
  process.exit(0);
});
