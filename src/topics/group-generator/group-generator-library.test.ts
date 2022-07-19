import GroupGeneratorLibrary from "./group-generator-library";
import TestGroupGenerator from "./test-group-generator";
import { createContext } from "../generation-context";

describe("test groups generator library", () => {
  let testGroupGenerator: TestGroupGenerator;

  beforeAll(async () => {
    const generationContext = await createContext({ blockNumber: 123456789 });
    testGroupGenerator = new TestGroupGenerator(generationContext);
  });

  beforeEach(() => {
    GroupGeneratorLibrary.reset();
  });

  test("Should throw error if get before init", async () => {
    expect(() => {
      GroupGeneratorLibrary.generators;
    }).toThrow();
  });

  test("Should init and get generators", async () => {
    GroupGeneratorLibrary.init({
      "example-generator": testGroupGenerator,
    });
    expect(GroupGeneratorLibrary.generators["example-generator"]).toBe(
      testGroupGenerator
    );
  });

  test("Should init and get one generator", async () => {
    GroupGeneratorLibrary.init({
      "example-generator": testGroupGenerator,
    });
    expect(GroupGeneratorLibrary.getGenerator("example-generator")).toBe(
      testGroupGenerator
    );
  });
});
