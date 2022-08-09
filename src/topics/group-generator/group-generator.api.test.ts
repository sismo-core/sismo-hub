import { FastifyInstance } from "fastify";
import request from "supertest";
import { GenerationFrequency } from "./group-generator";
import { createFastifyWithDefaults, ApiConfigurationDefault } from "api";

describe("test groups generator api", () => {
  const fastify: FastifyInstance = createFastifyWithDefaults(
    ApiConfigurationDefault.Test
  );

  beforeAll(async () => {
    await fastify.ready();
  });

  it("Should get example-generator", async () => {
    const response = await request(fastify.server).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      GenerationFrequency.Once
    );
  });
});
