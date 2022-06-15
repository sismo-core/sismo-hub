import generators from "../../list-generators/generators";
import {
  createContext,
  GenerationContext,
} from "../../src/utils/generation-context";

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
  console.log(`List generated ! ${Object.keys(list.data).length}`);
  process.exit(0);
});
