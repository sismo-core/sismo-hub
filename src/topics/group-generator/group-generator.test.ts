import { createContext } from "../generation-context";
import { MemoryGroupStore } from "../../infrastructure/group-store";
import TestGroupGenerator from "./test-group-generator";
import { GroupGenerator } from "./group-generator";

describe("test group generator", () => {
  test("Should throw error when generate function not defined", async () => {
    const generationContext = await createContext({ blockNumber: 123456789 });
    const testGroupGenerator = new GroupGenerator(new MemoryGroupStore());
    await expect(async () => {
      await testGroupGenerator.generate(generationContext);
    }).rejects.toThrow();
  });

  test("Should generate a group with the generator", async () => {
    const generationContext = await createContext({ blockNumber: 123456789 });
    const testGroupGenerator = new TestGroupGenerator(new MemoryGroupStore());
    const groups = await testGroupGenerator.generate(generationContext);
    expect(groups).toHaveLength(1);
  });
});
