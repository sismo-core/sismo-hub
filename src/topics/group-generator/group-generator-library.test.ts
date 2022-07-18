import GroupGeneratorLibrary from "./group-generator-library";
import { generateTestGroupGenerator } from "./test-group-generator";
import { GroupGenerator } from "./group-generator";

describe("test groups generator library", () => {
  let simpleGroupGenerator: GroupGenerator;

  beforeAll(() => {
    simpleGroupGenerator = generateTestGroupGenerator();
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
      "example-generator": simpleGroupGenerator,
    });
    expect(GroupGeneratorLibrary.generators["example-generator"]).toBe(
      simpleGroupGenerator
    );
  });

  test("Should init and get one generator", async () => {
    GroupGeneratorLibrary.init({
      "example-generator": simpleGroupGenerator,
    });
    expect(GroupGeneratorLibrary.getGenerator("example-generator")).toBe(
      simpleGroupGenerator
    );
  });
});
