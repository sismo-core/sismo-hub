import { getCurrentBlockNumber } from "./block-number";

describe("test block number", () => {
  test("Should retrieve last block number", async () => {
    expect(await getCurrentBlockNumber()).toBeGreaterThanOrEqual(15146977);
  });
});
