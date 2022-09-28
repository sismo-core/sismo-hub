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
    expect(response.body.items).toHaveLength(3);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      GenerationFrequency.Once
    );
  });

  it("Should get example-generator with generationTimestamp", async () => {
    await api.groupGenerators.generateGroups("test-generator", {
      timestamp: 1,
    });
    await api.groupGenerators.generateGroups("test-generator", {
      timestamp: 2,
    });
    const response = await request(api.server).get(
      `/group-generators/test-generator`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      GenerationFrequency.Once
    );
    expect(response.body.items[0].generationTimestamp).toBe(1);
  });

  it("Should get only latest group generator generation", async () => {
    const response = await request(api.server).get(
      `/group-generators/test-generator?latest=true`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      GenerationFrequency.Once
    );
    expect(response.body.items[0].generationTimestamp).toBe(2);
  });
});
