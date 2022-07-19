import GroupGeneratorLibrary from "./group-generator-library";
import TestGroupGenerator from "./test-group-generator";

describe("test groups generator library", () => {
  let testGroupGenerator: TestGroupGenerator;

  beforeAll(async () => {
    testGroupGenerator = new TestGroupGenerator();
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
