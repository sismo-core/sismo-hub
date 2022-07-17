import request from "supertest";
import app from "../../api/app";

describe("test groups generator api", () => {
  test("Should get not empty group generator", async () => {
    const response = await request(app).get(`/group-generators`);
    expect(response.statusCode).toBe(200);
    expect(Object.keys(response.body.items).length).toBeGreaterThan(0);
  });
});
