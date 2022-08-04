import TestGroupGenerator from "./test-group-generator";
import { MemoryGroupStore } from "infrastructure/group-store";
import { createContext } from "topics/generation-context";

describe("test group generator", () => {
  test("Should generate a group with the generator", async () => {
    const generationContext = await createContext({ blockNumber: 123456789 });
    const testGroupGenerator = new TestGroupGenerator(new MemoryGroupStore());
    const groups = await testGroupGenerator.generate(generationContext);
    expect(groups).toHaveLength(1);
  });
});
