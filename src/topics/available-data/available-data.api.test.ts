import request from "supertest";
import { testAvailableData } from "./test-available-data";
import { AvailableDataStore } from ".";
import { Api, ApiConfigurationDefault, createApiWithDefaults } from "api";

describe("test available data api", () => {
  const api: Api = createApiWithDefaults(ApiConfigurationDefault.Test);
  const store: AvailableDataStore = api.availableDataStore;

  beforeAll(async () => {
    await api.ready();
  });

  beforeEach(async () => {
    await store.reset();
  });

  it("Should get empty items", async () => {
    const response = await request(api.server).get(
      `/available-data/${testAvailableData.attester1_0.attesterName}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  it("Should store available data and get all", async () => {
    await store.save(testAvailableData.attester1_0);
    await store.save(testAvailableData.attester1_1);
    const response = await request(api.server).get(
      `/available-data/${testAvailableData.attester1_0.attesterName}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store available data and search latest", async () => {
    await store.save(testAvailableData.attester1_0);
    await store.save(testAvailableData.attester1_1);
    const response = await request(api.server).get(
      `/available-data/${testAvailableData.attester1_0.attesterName}?latest=true`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testAvailableData.attester1_1.timestamp
    );
  });
});
