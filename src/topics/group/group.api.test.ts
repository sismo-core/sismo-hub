import request from "supertest";
import { GroupStore } from "./group.store";
import { testGroups } from "./test-groups";
import { ConfigurationDefault, ServiceFactory } from "service-factory";

describe("test groups api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefault.Test, {})
    .getApiService(false)
    .getApi();
  const groupStore: GroupStore = api.groupStore;

  beforeAll(async () => {
    await api.ready();
  });

  beforeEach(async () => {
    await groupStore.reset();
  });

  it("Should get empty items", async () => {
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  it("Should store groups and get all", async () => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store groups and search latest", async () => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}?latest=true`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroups.group1_1.timestamp
    );
  });

  it("Should store groups and get latests", async () => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    await groupStore.save(testGroups.group2_0);
    const response = await request(api.server).get("/groups/latests");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store group and get dataUrl", async () => {
    await groupStore.save(testGroups.group1_0);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });

  it("Should store group and latests get dataUrl", async () => {
    await groupStore.save(testGroups.group1_0);
    const response = await request(api.server).get(`/groups/latests`);
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });
});
