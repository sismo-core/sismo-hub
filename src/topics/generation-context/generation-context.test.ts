import { createContext } from "./generation-context";

describe("test generation context", () => {
  it("Should generate a context with fixed block number", async () => {
    const context = await createContext({ blockNumber: 1234567890 });
    expect(context.blockNumber).toEqual(1234567890);
  });

  it("Should generate a context with fixed block number and fixed timestamp", async () => {
    const timestamp = new Date("2022-04-02").getTime() / 1000;
    const context = await createContext({
      timestamp: timestamp,
      blockNumber: 1234567890,
    });
    expect(context.blockNumber).toEqual(1234567890);
    expect(context.timestamp).toEqual(timestamp);
  });

  it("Should generate a context with timestamp in seconds", async () => {
    const context = await createContext({
      blockNumber: 1234567890,
    });
    expect(context.timestamp).toBeLessThan(10000000000000); // < year 2286
  });

  it("Should generate a context with current block number", async () => {
    const context = await createContext({});
    expect(context.blockNumber).toBeGreaterThan(15211120);
  });

  it("Should generate a context with timestamp from environment variable", async () => {
    const envBackup = process.env;
    process.env.GENERATION_TIMESTAMP = "1657874155";
    const context = await createContext({ blockNumber: 1234567890 });
    process.env = envBackup;
    expect(context.timestamp).toBe(1657874155);
  });

  it("Should generate a context with block number from environment variable", async () => {
    const envBackup = process.env;
    process.env.BLOCK_NUMBER = "2222222222";
    const context = await createContext({});
    process.env = envBackup;
    expect(context.blockNumber).toBe(2222222222);
  });
});
