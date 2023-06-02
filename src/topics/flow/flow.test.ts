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
  const serviceFactory = ServiceFactory.withDefault(
    ConfigurationDefaultEnv.Test,
    {}
  );
  const service = serviceFactory.getFlowService();

  it("Should get badge with valid data", async () => {
    await service.updateFlows(testFlows);
    const flows = await service.getFlows();
    expect(flows).toHaveLength(3);
    expect(flows[0].chainId).toBe(networkChainIds.test);
    expect(flows[0].badgeIds).toEqual([1001, 1002]);
    expect(flows[1].chainId).toBe(networkChainIds.test);
    expect(flows[1].badgeIds).toEqual([1002]);
    expect(flows[2].chainId).toBe(networkChainIds.test);
    expect(flows[2].badgeIds).toEqual([1004]);
  });

  it("Should filter flows by network", async () => {
    await service.updateFlows([...testFlows, flowWithBadNetwork]);
    const flowService = new FlowService(
      service.flowStore,
      [Network.Test]
    );
    expect(await flowService.getFlows()).toHaveLength(2);
  });

  it("Should throw error with invalid flow", async () => {
    await service.updateFlows([flowWithBadNetwork]);
    const flowService = new FlowService(
      service.flowStore,
      [Network.Local, Network.Test]
    );
    await expect(async () => {
      await flowService.getFlows();
    }).rejects.toThrow();
  });

  it("Should throw error with invalid internal collections ids", async () => {
    await service.updateFlows([flowWithBadCollectionId]);
    const flowService = new FlowService(
      service.flowStore,
      [Network.Test]
    );
    await expect(async () => {
      await flowService.getFlows();
    }).rejects.toThrow();
  });
});