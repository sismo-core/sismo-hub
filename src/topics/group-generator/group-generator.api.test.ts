import request from "supertest";
import app from "../../api/app";
import GroupGeneratorLibrary from "./group-generator-library";
import { generateTestGroupGenerator } from "./test-group-generator";

describe("test groups generator api", () => {
  beforeAll(async () => {
    GroupGeneratorLibrary.init({
      "example-generator": generateTestGroupGenerator(),
    });
  });

  test("Should get example-generator", async () => {
    const response = await request(app).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items)).toEqual(["example-generator"]);
  });
});
