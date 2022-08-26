import { Flow, FlowService } from "./flow";
import { ConfigurationDefault, ServiceFactory } from "service-factory";
import { Network, networkChainIds } from "topics/attester";
import { testAttester } from "topics/attester/test-attester";
import { testBadgesCollection } from "topics/badge/test-badge";

const invalidFlow: Flow = {
  path: "test-flow-1",
  attester: testAttester.name,
  network: Network.Local, // testBadgesCollection is not configured for Local Network
  attesterType: "hydra-s1",
  badgesCollection: testBadgesCollection,
  badgesInternalCollectionsIds: [0, 1],
  title: "Test Flow 1",
  logoUrl: null,
  subtitle: "Test Subtitle",
  onboardingDescription: "Mint this badge to test.",
  ctaLabel: "Access gated channel",
  ctaUrl: "https://example.com/1",
  congratulationTexts: ["Congratulation 1", "Congratulation 2"],
};

describe("test flows api", () => {
  const service = ServiceFactory.withDefault(
    ConfigurationDefault.Test,
    {}
  ).getFlowService();

  it("Should get badge with valid data", async () => {
    const flows = service.getFlows();
    expect(flows).toHaveLength(2);
    expect(flows[0].chainId).toBe(networkChainIds.test);
    expect(flows[0].badgeIds).toEqual([1001, 1002]);
  });

  it("Should throw error with invalid flow", async () => {
    const flowService = new FlowService([invalidFlow]);
    await expect(() => flowService.getFlows()).toThrow();
  });
});
