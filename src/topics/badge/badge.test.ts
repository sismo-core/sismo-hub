import { BadgeService } from "./badge";
import { testBadgesCollection } from "./test-badge";
import { Network } from "topics/attester";

describe("Test badges", () => {
  const badgeServices = new BadgeService([testBadgesCollection]);

  it("should have empty badges for other network", async () => {
    const badges = badgeServices.getBadges(Network.Mainnet);
    expect(Object.keys(badges)).toHaveLength(0);
  });

  it("should have badges with valid collectionId", async () => {
    const badges = badgeServices.getBadges(Network.Test);
    expect(Object.keys(badges)).toHaveLength(2);
    expect(badges[0].collectionId).toBe(1001);
    expect(badges[0].name).toBe("Test Badge");
    expect(badges[1].collectionId).toBe(1002);
    expect(badges[1].name).toBe("Test Badge 2");
  });
});
