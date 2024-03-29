import request from "supertest";
import { GeneratedFlow } from "./flow";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("test flows api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();

  beforeAll(async () => {
    await api.ready();
  });

  it("Should get flows", async () => {
    const response = await request(api.server).get(`/flows`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(3);
    const flow1: GeneratedFlow = response.body.items[0];
    expect(flow1.badgeIds).toEqual([1001, 1002]);
  });
});
