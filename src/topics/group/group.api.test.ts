import request from "supertest";
import { testGroups } from "./test-groups";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";
import { GroupGeneratorService } from "topics/group-generator";

describe("test groups api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();
  const groupGeneratorService: GroupGeneratorService = api.groupGenerators;

  beforeAll(async () => {
    await api.ready();
  });

  beforeEach(async () => {
    await groupGeneratorService.groupStore.reset();
    await groupGeneratorService.groupSnapshotStore.reset();
  });

  it("Should get empty items", async () => {
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  it("Should store groups and get all", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    await groupGeneratorService.saveGroup(testGroups.group1_1);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store groups and search latest", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    await groupGeneratorService.saveGroup(testGroups.group1_1);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}?latest=true`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroups.group1_1.timestamp
    );
  });

  it("Should store groups and search the timestamped group", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    await groupGeneratorService.saveGroup(testGroups.group1_1);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}?timestamp=${testGroups.group1_0.timestamp}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroups.group1_0.timestamp
    );
  });

  it("Should store groups and get latests", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    await groupGeneratorService.saveGroup(testGroups.group1_1);
    await groupGeneratorService.saveGroup(testGroups.group2_0);
    const response = await request(api.server).get("/groups/latests");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store group and get dataUrl", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });

  it("Should store group and get accountSources", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const response = await request(api.server).get(
      `/groups/${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items[0])).toContain("accountSources");
  });

  it("Should store group and get accountSources changes", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    await groupGeneratorService.saveGroup(testGroups.group1_1);
    const response = await request(api.server).get("/groups/latests");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    const accountSourceLength = testGroups.group1_1.accountSources
      ? testGroups.group1_1.accountSources[0].length
      : 0;
    expect(Object.keys(response.body.items[0].accountSources[0])).toHaveLength(
      accountSourceLength
    );
  });

  it("Should store group and latests get dataUrl", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const response = await request(api.server).get(`/groups/latests`);
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });
});
