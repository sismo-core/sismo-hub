import request from "supertest";
import { GenerationFrequency } from "./group-generator";
import { createApiWithDefaults, ApiConfigurationDefault, Api } from "api";

describe("test groups generator api", () => {
  const api: Api = createApiWithDefaults(ApiConfigurationDefault.Test);

  beforeAll(async () => {
    await api.ready();
  });

  it("Should get example-generator", async () => {
    const response = await request(api.server).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].name).toBe("test-generator");
    expect(response.body.items[0].generationFrequency).toBe(
      GenerationFrequency.Once
    );
  });
});
