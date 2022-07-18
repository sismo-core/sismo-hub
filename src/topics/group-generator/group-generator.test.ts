import { GenerationContext, createContext } from "../generation-context";
import { GroupGenerator } from "./group-generator";
import { generateTestGroupGenerator } from "./test-group-generator";

describe("test group generator", () => {
  let generationContext: GenerationContext;
  let simpleGroupGenerator: GroupGenerator;

  beforeAll(async () => {
    generationContext = await createContext({ blockNumber: 123456789 });
    simpleGroupGenerator = generateTestGroupGenerator();
  });

  test("Should generate a group with the generator", async () => {
    await simpleGroupGenerator.generate(generationContext);
  });
});
