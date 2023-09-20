import request from "supertest";
import { testAvailableData } from "./test-available-data";
import { AvailableDataStore } from ".";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("test available data api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();
  const store: AvailableDataStore = api.availableDataStore;

  beforeAll(async () => {
    await api.ready();
  });

  beforeEach(async () => {
    await store.reset();
  });

  it("Should get empty items", async () => {
    const response = await request(api.server).get(
      `/available-data/${testAvailableData.attester1_0.network}/${testAvailableData.attester1_0.registryTreeName}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  it("Should store available data and get all", async () => {
    await store.save(testAvailableData.attester1_0);
    await store.save(testAvailableData.attester1_1);
    const response = await request(api.server).get(
      `/available-data/${testAvailableData.attester1_0.network}/${testAvailableData.attester1_0.registryTreeName}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store available data and search latest", async () => {
    await store.save(testAvailableData.attester1_0);
    await store.save(testAvailableData.attester1_1);
    const response = await request(api.server).get(
      `/available-data/${testAvailableData.attester1_0.network}/${testAvailableData.attester1_0.registryTreeName}?latest=true`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(testAvailableData.attester1_1.timestamp);
  });

  it("Should store available data and search on chain", async () => {
    await store.save(testAvailableData.attester1_0);
    await store.save(testAvailableData.attester1_1);
    const response = await request(api.server).get(
      `/available-data/${testAvailableData.attester1_0.network}/${testAvailableData.attester1_0.registryTreeName}?isOnChain=true`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].identifier).toBe(testAvailableData.attester1_0.identifier);
  });
});
