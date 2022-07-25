import "reflect-metadata";
import request from "supertest";
import { DependencyContainer } from "tsyringe";
import { getFastify } from "../../api/app";
import { getTestGroups } from "./test-groups";
import { FastifyInstance } from "fastify";
import { getMemoryContainer } from "../../infrastructure";
import { Group } from "./group";

describe("test groups api", () => {
  let fastify: FastifyInstance;
  let container: DependencyContainer;
  let testGroups: { [name: string]: Group };

  beforeAll(() => {
    container = getMemoryContainer();
  });

  beforeEach(async () => {
    container.clearInstances();
    fastify = getFastify(
      false,
      {},
      { groupStore: container.resolve("GroupStore") }
    );
    await fastify.ready();
    testGroups = getTestGroups(container);
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
    await testGroups["group1_0"].save();
    await testGroups["group1_1"].save();
    const response = await request(fastify.server).get(
      `/groups?groupName=${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  test("Should store groups and search latest", async () => {
    await testGroups["group1_0"].save();
    await testGroups["group1_1"].save();
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
    await testGroups["group1_0"].save();
    await testGroups["group1_1"].save();
    await testGroups["group2_0"].save();
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
    await testGroups["group1_0"].save();
    const response = await request(fastify.server).get(
      `/groups?groupName=${testGroups.group1_0.name}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(Object.keys(response.body.items[0])).toContain("dataUrl");
  });

  test("Should store group and latests get dataUrl", async () => {
    await testGroups["group1_0"].save();
    const response = await request(fastify.server).get(`/groups/latests`);
    expect(response.statusCode).toBe(200);
    expect(
      Object.keys(response.body.items[testGroups.group1_0.name])
    ).toContain("dataUrl");
  });
});
