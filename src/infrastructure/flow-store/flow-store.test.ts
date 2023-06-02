import { LocalFlowStore } from "./local-flow-store";
import { MemoryFlowStore } from "./memory-flow-store";
import { FlowStore } from "topics/flow/flow.store";
import { testFlows } from "topics/flow/test-flows";

describe("test group generator test", () => {
  const memoryStore = new MemoryFlowStore();
  const localFlowStore = new LocalFlowStore();

  const testCases: [FlowStore[], FlowStore[]] = [
    [memoryStore],
    [localFlowStore]
  ];

  beforeEach(async () => {
    await memoryStore.reset();
  });

  it.each(testCases)(
    "Should save a flow and retrieve from store",
    async (store) => {
      await store.updateAll([testFlows[0]]);
      const flows = await store.all();
      expect(flows).toHaveLength(1);
      expect(flows[0]).toEqual(
        testFlows[0]
      );
    }
  );

  it.each(testCases)(
    "Should save multiple flows and retrieve them from store",
    async (store) => {
      await store.updateAll([testFlows[0], testFlows[1]]);
      const flows = await store.all();
      expect(flows).toHaveLength(2);
      expect(flows[0]).toEqual(
        testFlows[0]
      );
      expect(flows[1]).toEqual(
        testFlows[1]
      );
    }
  );
});