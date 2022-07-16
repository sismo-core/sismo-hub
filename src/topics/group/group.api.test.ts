import request from "supertest";
import app from "../../api/app";
import resetTestInfrastructure from "../../infrastructure/test-infrastructure";
import testGroups from "./test-groups";

describe("test groups api", () => {
  beforeEach(async () => {
    await resetTestInfrastructure();
  });

  test("Should get empty items", async () => {
    const response = await request(app).get("/groups");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });

  test("Should store groups and get all", async () => {
    await testGroups.group1_0.save();
    await testGroups.group1_1.save();
    const response = await request(app).get("/groups");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(2);
  });

  test("Should store groups and search latest", async () => {
    await testGroups.group1_0.save();
    await testGroups.group1_1.save();
    const response = await request(app).get("/groups?latest=true");
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
    expect(response.body.items[0].timestamp).toBe(
      testGroups.group1_1.timestamp
    );
  });

  test("Should store groups and get latests", async () => {
    await testGroups.group1_0.save();
    await testGroups.group1_1.save();
    await testGroups.group2_0.save();
    const response = await request(app).get("/groups/latests");
    expect(response.statusCode).toBe(200);
    const groupNames = Object.keys(response.body.items);
    expect(groupNames).toHaveLength(2);
    expect(groupNames).toContain(testGroups.group1_1.name);
    expect(groupNames).toContain(testGroups.group2_0.name);
    expect(response.body.items[testGroups.group1_1.name].timestamp).toBe(
      testGroups.group1_1.timestamp
    );
  });
});
