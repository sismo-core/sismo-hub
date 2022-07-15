import Infrastructure from "./index";
import localInfrastructureServices from "./local-infrastructure";
import memoryInfrastructureServices from "./memory-infrastructure";

describe("test infrastructure", () => {
  beforeEach(() => {
    Infrastructure.reset();
  });

  test("Should init services and get back", async () => {
    await Infrastructure.init(localInfrastructureServices);
    expect(Infrastructure.services).toBe(localInfrastructureServices);
  });

  test("Should throw error get services before init", async () => {
    await expect(() => {
      Infrastructure.services;
    }).toThrow();
  });

  test("Should default init local infrastructure", async () => {
    await Infrastructure.init();
    expect(Infrastructure.services).toBe(localInfrastructureServices);
  });

  test("Should default init from environment variable", async () => {
    process.env.INFRASTRUCTURE_IMPORT_PATH = "./memory-infrastructure";
    await Infrastructure.init();
    process.env.INFRASTRUCTURE_IMPORT_PATH = undefined;
    expect(Infrastructure.services).toBe(memoryInfrastructureServices);
  });
});
