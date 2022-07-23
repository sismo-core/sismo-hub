import request from "supertest";
import { getFastify } from "../../api/app";
import testGroups from "./test-groups";
import { FastifyInstance } from "fastify";
import { MemoryGroupStore } from "../../infrastructure/group-store";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";

describe("test groups api", () => {
  let fastify: FastifyInstance;
  let groupStore: MemoryGroupStore;

  beforeEach(async () => {
    groupStore = new MemoryGroupStore();
    fastify = getFastify(false, {}, { groupStore: groupStore });
    await fastify.ready();
    await resetTestInfrastructure();
  });

  test("Should respond 400 without groupName", async () => {
    const response = await request(fastify.server).get("/groups");
    expect(response.statusCode).toBe(400);
  });

  test("Should get empty items", async () => {
    const response = await request(fastify.server).get(
      `/groups?groupName=${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  test("Should store groups and get all", async () => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    const response = await request(fastify.server).get(
      `/groups?groupName=${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  test("Should store groups and search latest", async () => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    const response = await request(fastify.server).get(
      `/groups?groupName=${testGroups.group1_0.name}&latest=true`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroups.group1_1.timestamp
    );
  });

  test("Should store groups and get latests", async () => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    await groupStore.save(testGroups.group2_0);
    const response = await request(fastify.server).get("/groups/latests");
    expect(response.statusCode).toBe(200);
    const groupNames = Object.keys(response.body.items);
    expect(groupNames).toHaveLength(2);
    expect(groupNames).toContain(testGroups.group1_1.name);
    expect(groupNames).toContain(testGroups.group2_0.name);
    expect(response.body.items[testGroups.group1_1.name].timestamp).toBe(
      testGroups.group1_1.timestamp
    );
  });

  test("Should store group and get dataUrl", async () => {
    await groupStore.save(testGroups.group1_0);
    const response = await request(fastify.server).get(
      `/groups?groupName=${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });

  test("Should store group and latests get dataUrl", async () => {
    await groupStore.save(testGroups.group1_0);
    const response = await request(fastify.server).get(`/groups/latests`);
    expect(response.statusCode).toBe(200);
    expect(
      Object.keys(response.body.items[testGroups.group1_0.name])
    ).toContain("dataUrl");
  });
});
