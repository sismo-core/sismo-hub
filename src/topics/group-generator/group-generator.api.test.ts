import request from "supertest";
import { getFastify } from "../../api/app";
import TestGroupGenerator from "./test-group-generator";
import { GroupGenerator } from "./group-generator";
import { FastifyInstance } from "fastify";
import { MemoryGroupStore } from "../../infrastructure/group-store";

describe("test groups generator api", () => {
  let fastify: FastifyInstance;
  let testGroupGenerator: TestGroupGenerator;
  let groupGenerators: { [name: string]: GroupGenerator };

  beforeAll(async () => {
    testGroupGenerator = new TestGroupGenerator();
    groupGenerators = {
      "example-generator": testGroupGenerator,
    };
    fastify = getFastify(
      false,
      { groupGenerators },
      { groupStore: new MemoryGroupStore() }
    );
    await fastify.ready();
  });

  test("Should get example-generator", async () => {
    const response = await request(fastify.server).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("example-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      testGroupGenerator.generationFrequency
    );
  });
});
