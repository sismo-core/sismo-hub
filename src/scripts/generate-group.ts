import generators from "../../group-generators/generators";
import { createContext, GenerationContext } from "../helpers/utils/generation-context";
import { setInfrastructureServices, localInfrastructure } from "../infrastructure"


createContext().then(async (generationContext: GenerationContext) => {
  const generatorName = process.argv[2];
  if (!generatorName) {
    throw new Error("generatorName is not defined!");
  }

  setInfrastructureServices(localInfrastructure);
  const generator = generators.find(
    (generator) => generator.name === generatorName
  );
  if (!generator) {
    throw new Error(`Generator ${generatorName} not found !`);
  }

  const group = await generator.generate(generationContext);
  console.log(`Group generated !`);
  const path = await generator.storeGroup(group);
  console.log(`Group stored in "${path}"`);
});
