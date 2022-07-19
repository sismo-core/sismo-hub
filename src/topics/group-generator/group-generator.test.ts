import { createContext } from "../generation-context";
import TestGroupGenerator from "./test-group-generator";

describe("test group generator", () => {
  test("Should generate a group with the generator", async () => {
    const generationContext = await createContext({ blockNumber: 123456789 });
    await new TestGroupGenerator(generationContext).generate();
  });
});
