import { MemoryLogger } from "./memory-logger";

describe("test memory logger", () => {
  const memoryLogger = new MemoryLogger();

  beforeEach(async () => {
    memoryLogger.reset();
  });

  it("Should log and retrieve them", async () => {
    memoryLogger.debug("debug");
    memoryLogger.info("info");
    memoryLogger.warning("warning");
    memoryLogger.error("error");
    expect(memoryLogger.logQueue).toEqual([["debug"], ["info"], ["warning"], ["error"]]);
  });

  it("Should log more complex info", async () => {
    memoryLogger.debug("debug", { trace: "hello" });
    expect(memoryLogger.logQueue).toEqual([["debug", { trace: "hello" }]]);
  });
});
