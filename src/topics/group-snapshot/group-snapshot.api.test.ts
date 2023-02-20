import request from "supertest";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";
import { GroupGeneratorService } from "topics/group-generator";
import { testGroupSnapshots } from "topics/group-snapshot/test-group-snapshots";
import { testGroups } from "topics/group/test-groups";

describe("test group snapshots api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();
  const groupGeneratorService: GroupGeneratorService = api.groupGenerators;

  beforeAll(async () => {
    await api.ready();
  });

  beforeEach(async () => {
    await groupGeneratorService.groupSnapshotStore.reset();
    await groupGeneratorService.groupStore.reset();
  });

  it("Should get empty items", async () => {
    const response = await request(api.server).get(
      `/group-snapshots/${testGroupSnapshots.groupSnapshot1_0.groupId}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  it("Should store group snapshots and get all for an id", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const savedGroup = await groupGeneratorService.saveGroup(
      testGroups.group1_1
    );
    const response = await request(api.server).get(
      `/group-snapshots/${savedGroup.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store group snapshots and get all for a name", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const savedGroup = await groupGeneratorService.saveGroup(
      testGroups.group1_1
    );
    const response = await request(api.server).get(
      `/group-snapshots/name/${savedGroup.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store group snapshots and search latest for an id", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const savedGroup = await groupGeneratorService.saveGroup(
      testGroups.group1_1
    );
    const response = await request(api.server).get(
      `/group-snapshots/${savedGroup.id}?timestamp=latest`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store group snapshots and search latest for a name", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const savedGroup = await groupGeneratorService.saveGroup(
      testGroups.group1_1
    );
    const response = await request(api.server).get(
      `/group-snapshots/name/${savedGroup.name}?timestamp=latest`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store group snapshots and search the timestamped group snapshot with id", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const savedGroup = await groupGeneratorService.saveGroup(
      testGroups.group1_1
    );
    const response = await request(api.server).get(
      `/group-snapshots/${savedGroup.id}?timestamp=${testGroupSnapshots.groupSnapshot1_1.timestamp}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store group snapshots and search the timestamped group snapshot with name", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const savedGroup = await groupGeneratorService.saveGroup(
      testGroups.group1_1
    );
    const response = await request(api.server).get(
      `/group-snapshots/name/${savedGroup.name}?timestamp=${testGroupSnapshots.groupSnapshot1_1.timestamp}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store group snapshots and get latests", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    await groupGeneratorService.saveGroup(testGroups.group1_1);
    await groupGeneratorService.saveGroup(testGroups.group2_0);
    const response = await request(api.server).get("/group-snapshots/latests");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
    expect(response.body.items[1].timestamp).toBe(
      testGroupSnapshots.groupSnapshot2_0.timestamp
    );
  });

  it("Should store group snapshot and get dataUrl", async () => {
    const savedGroup = await groupGeneratorService.saveGroup(
      testGroups.group1_0
    );
    const response = await request(api.server).get(
      `/group-snapshots/${savedGroup.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });

  it("Should store group snapshots and latests get dataUrl", async () => {
    await groupGeneratorService.saveGroup(testGroups.group1_0);
    const response = await request(api.server).get(`/group-snapshots/latests`);
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });
});
