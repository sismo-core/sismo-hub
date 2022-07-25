import "reflect-metadata";
import request from "supertest";
import { FastifyInstance } from "fastify";
import { getFastify } from "../../api/app";
import { getMemoryContainer } from "../../infrastructure";
import TestGroupGenerator from "./test-group-generator";
import { GroupGenerator } from "./group-generator";

describe("test groups generator api", () => {
  let fastify: FastifyInstance;
  let testGroupGenerator: TestGroupGenerator;
  let groupGenerators: { [name: string]: GroupGenerator };

  beforeAll(async () => {
    const container = getMemoryContainer();
    testGroupGenerator = container.resolve(TestGroupGenerator);
    groupGenerators = {
      "example-generator": testGroupGenerator,
    };
    fastify = getFastify(false, { groupGenerators }, container);
    await fastify.ready();
  });

  it("Should get example-generator", async () => {
    const response = await request(fastify.server).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("example-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      testGroupGenerator.generationFrequency
    );
  });
});
