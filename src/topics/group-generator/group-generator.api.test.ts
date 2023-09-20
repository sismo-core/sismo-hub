import request from "supertest";
import { GenerationFrequency } from ".";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("test groups generator api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();
  beforeAll(async () => {
    await api.ready();
  });

  it("Should get example-generator", async () => {
    const response = await request(api.server).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(6);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(GenerationFrequency.Once);
  });

  it("Should get example-generator with generationTimestamp", async () => {
    await api.groupGenerators.generateGroups("test-generator", {
      timestamp: 1,
    });
    await api.groupGenerators.generateGroups("test-generator", {
      timestamp: 2,
    });
    const response = await request(api.server).get(`/group-generators/test-generator`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(GenerationFrequency.Once);
    expect(response.body.items[0].generationTimestamp).toBe(1);
    expect(response.body.items[0].lastGenerationDuration).not.toBe(undefined);
  });

  it("Should get only latest group generator generation", async () => {
    const response = await request(api.server).get(`/group-generators/test-generator?latest=true`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(GenerationFrequency.Once);
    expect(response.body.items[0].generationTimestamp).toBe(2);
    // lastGenerationDuration can be null or not (depends on whether it was created before the implementation of lastGenerationDuration or not)
  });

  it("should not regenerate the group if the generation is too recent", async () => {
    await api.groupGenerators.generateGroups("test-generator", {
      timestamp: 2 + 60, // 1 minute after last generation
      lastGenerationTimeInterval: 60 * 2, // 2 minutes
    });
    const response = await request(api.server).get(`/group-generators/test-generator?latest=true`);

    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].generationTimestamp).toBe(2);
    // lastGenerationDuration can be null or not (depends on whether it was created before the implementation of lastGenerationDuration or not)
  });
});
