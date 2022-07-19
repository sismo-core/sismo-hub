import request from "supertest";
import app from "../../api/app";
import GroupGeneratorLibrary from "./group-generator-library";
import TestGroupGenerator from "./test-group-generator";

describe("test groups generator api", () => {
  let testGroupGenerator: TestGroupGenerator;

  beforeAll(async () => {
    testGroupGenerator = new TestGroupGenerator();

    GroupGeneratorLibrary.init({
      "example-generator": testGroupGenerator,
    });
  });

  test("Should get example-generator", async () => {
    const response = await request(app).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("example-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      testGroupGenerator.generationFrequency
    );
  });
});
