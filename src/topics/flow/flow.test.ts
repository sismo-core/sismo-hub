import { Flow, FlowService } from "./flow";
import { ConfigurationDefaultEnv, ServiceFactory } from "service-factory";
import { testFlows } from "topics/flow/test-flows";
import { Network, networkChainIds } from "topics/registry-tree";

const flowWithBadNetwork: Flow = {
  ...testFlows[0],
  networks: [Network.Local], // testBadgesCollection is not configured for Local Network
};

const flowWithBadCollectionId: Flow = {
  ...testFlows[0],
  badgesInternalCollectionsIds: [0, 4], // testBadgesCollection does not have the internal collection id 4
};

describe("test flows api", () => {
  const service = ServiceFactory.withDefault(ConfigurationDefaultEnv.Test, {}).getFlowService();

  it("Should get badge with valid data", async () => {
    const flows = service.getFlows();
    expect(flows).toHaveLength(3);
    expect(flows[0].chainId).toBe(networkChainIds.test);
    expect(flows[0].badgeIds).toEqual([1001, 1002]);
    expect(flows[1].chainId).toBe(networkChainIds.test);
    expect(flows[1].badgeIds).toEqual([1002]);
    expect(flows[2].chainId).toBe(networkChainIds.test);
    expect(flows[2].badgeIds).toEqual([1004]);
  });

  it("Should filter flows by network", async () => {
    const flowService = new FlowService([...testFlows, flowWithBadNetwork], [Network.Test]);
    expect(flowService.getFlows()).toHaveLength(3);
  });

  it("Should throw error with invalid flow", async () => {
    const flowService = new FlowService([flowWithBadNetwork], [Network.Local, Network.Test]);
    await expect(() => flowService.getFlows()).toThrow();
  });

  it("Should throw error with invalid internal collections ids", async () => {
    const flowService = new FlowService([flowWithBadCollectionId], [Network.Test]);
    await expect(() => flowService.getFlows()).toThrow();
  });
});
