import request from "supertest";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";

describe("test resolver api", () => {
  const api = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {})
    .getApiService(false)
    .getApi();

  beforeAll(async () => {
    await api.ready();
  });

  it("Should get empty items", async () => {
    const response = await request(api.server).post("/resolver").send([]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("Should resolve items when request content type is plain text", async () => {
    const response = await request(api.server).post("/resolver").set("Content-type", "text/plain")
      .send(`[
        "test:sismo",
        "0x411C16b4688093C81db91e192aeB5945dCA6B785"
      ]`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      "0x5151000000000000000000000000000000000001",
      "0x411c16b4688093c81db91e192aeb5945dca6b785",
    ]);
  });

  it("Should resolve items when request content type is application json", async () => {
    const response = await request(api.server)
      .post("/resolver")
      .set("Content-type", "application/json")
      .send(["test:sismo", "0x411C16b4688093C81db91e192aeB5945dCA6B785"]);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      "0x5151000000000000000000000000000000000001",
      "0x411c16b4688093c81db91e192aeb5945dca6b785",
    ]);
  });
});
