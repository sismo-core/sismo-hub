import { GenerationContext } from "./group-generator";
import { testGroupGenerator } from "./test-group-generator";
import { MemoryGroupStore } from "infrastructure/group-store";

describe("test group generator", () => {
  test("Should generate a group with the generator", async () => {
    const generationContext: GenerationContext = {
      blockNumber: 123456789,
      timestamp: 1,
    };
    const groups = await testGroupGenerator.generate(
      generationContext,
      new MemoryGroupStore()
    );
    expect(groups).toHaveLength(1);
  });
});
