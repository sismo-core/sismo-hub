import request from "supertest";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";
import { GroupSnapshotStore } from "topics/group-snapshot/group-snapshot.store";
import { testGroupSnapshots } from "topics/group-snapshot/test-group-snapshots";

describe("test groups api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();
  const groupSnapshotStore: GroupSnapshotStore = api.groupSnapshotStore;

  beforeAll(async () => {
    await api.ready();
  });

  beforeEach(async () => {
    await groupSnapshotStore.reset();
  });

  it("Should get empty items", async () => {
    const response = await request(api.server).get(
      `/group-snapshots/${testGroupSnapshots.groupSnapshot1_0.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  it("Should store group snapshots and get all for an id", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    const response = await request(api.server).get(
      `/group-snapshots/${testGroupSnapshots.groupSnapshot1_0.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store group snapshots and get all for a name", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    const response = await request(api.server).get(
      `/group-snapshots/name/${testGroupSnapshots.groupSnapshot1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  it("Should store group snapshots and search latest for an id", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    const response = await request(api.server).get(
      `/group-snapshots/${testGroupSnapshots.groupSnapshot1_0.id}?timestamp=latest`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store group snapshots and search latest for a name", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    const response = await request(api.server).get(
      `/group-snapshots/name/${testGroupSnapshots.groupSnapshot1_0.name}?timestamp=latest`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store groups and search the timestamped group with id", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    const response = await request(api.server).get(
      `/group-snapshots/${testGroupSnapshots.groupSnapshot1_0.id}?timestamp=${testGroupSnapshots.groupSnapshot1_1.timestamp}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store groups and search the timestamped group with name", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    const response = await request(api.server).get(
      `/group-snapshots/name/${testGroupSnapshots.groupSnapshot1_0.name}?timestamp=${testGroupSnapshots.groupSnapshot1_1.timestamp}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroupSnapshots.groupSnapshot1_1.timestamp
    );
  });

  it("Should store group snapshots and get latests", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot2_0);
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
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const response = await request(api.server).get(
      `/group-snapshots/${testGroupSnapshots.groupSnapshot1_0.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });

  it("Should store group snapshot and get accountSources", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const response = await request(api.server).get(
      `/group-snapshots/${testGroupSnapshots.groupSnapshot1_0.id}`
    );
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items[0])).toContain("accountSources");
  });

  it("Should store group snapshots and get accountSources changes", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_1);
    const response = await request(api.server).get("/group-snapshots/latests");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    const accountSourceLength = testGroupSnapshots.groupSnapshot1_1
      .accountSources
      ? testGroupSnapshots.groupSnapshot1_1.accountSources[0].length
      : 0;
    expect(Object.keys(response.body.items[0].accountSources[0])).toHaveLength(
      accountSourceLength
    );
  });

  it("Should store group snapshots and latests get dataUrl", async () => {
    await groupSnapshotStore.save(testGroupSnapshots.groupSnapshot1_0);
    const response = await request(api.server).get(`/group-snapshots/latests`);
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });
});
