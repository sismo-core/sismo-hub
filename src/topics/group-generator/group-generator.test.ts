import { GenerationContext } from "./group-generator";
import { TestGroupGenerator } from "./test-group-generator";
import { MemoryGroupStore } from "infrastructure/group-store";

describe("test group generator", () => {
  test("Should generate a group with the generator", async () => {
    const generationContext: GenerationContext = {
      blockNumber: 123456789,
      timestamp: 1,
    };
    const testGroupGenerator = new TestGroupGenerator(new MemoryGroupStore());
    const groups = await testGroupGenerator.generate(generationContext);
    expect(groups).toHaveLength(1);
  });
});
