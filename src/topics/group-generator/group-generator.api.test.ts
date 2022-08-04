import request from "supertest";
import { FastifyInstance } from "fastify";
import TestGroupGenerator from "./test-group-generator";
import { getTestFastify } from "api/test-app";
import { MemoryGroupStore } from "infrastructure/group-store";

describe("test groups generator api", () => {
  const testGroupGenerator: TestGroupGenerator = new TestGroupGenerator(
    new MemoryGroupStore()
  );
  const fastify: FastifyInstance = getTestFastify({
    groupGenerators: {
      "example-generator": new TestGroupGenerator(new MemoryGroupStore()),
    },
  });

  beforeEach(async () => {
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
