import { MemoryGroupStore } from "infrastructure/group-store";
import { StdoutLogger } from "infrastructure/logger/stdout-logger";
import { storeEligibilityDescriptionsInGroupsInsteadOfBadges } from "migration/02192023/migrate-badge-specs-to-groups-02192023";
import { testGroupsMigrationWithData } from "migration/migration-test-groups";

describe("Test migration -> add description and specs to groups instead of badges", () => {
  const groupStore = new MemoryGroupStore();

  beforeAll(async () => {
    await groupStore.save({
      ...testGroupsMigrationWithData.group1_0,
      name: "test1",
      generatedBy: "proof-of-humanity",
    });
    for (let i = 0; i < 10; i++) {
      await groupStore.save({
        ...testGroupsMigrationWithData.group1_0,
        name: `test2_${i}`,
        generatedBy: "gitcoin-grants-rounds-donors",
      });
    }
    await groupStore.save({
      ...testGroupsMigrationWithData.group2_0,
      name: "test3",
      generatedBy: "proof-of-humanity",
    });
  });

  it("should migrate groups", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const logs = await storeEligibilityDescriptionsInGroupsInsteadOfBadges({
      groupStore,
      loggerService: new StdoutLogger(),
    });

    const groups = await groupStore.all();
    expect(Object.values(groups).length).toBe(12);
    expect(groups["test1"].description).toBe("Prove you are a human with PoH");
    expect(groups["test1"].specs).toBe(
      "Appear as a verified Proof of Humanity submission on the Proof of Humanity subgraph"
    );
    expect(groups["test2_0"].description).toBe(
      "You must have donated in the 15th round of Gitcoin Grants"
    );
    expect(groups["test2_0"].specs).toBe(
      "Donated to the Gitcoin Grant Round 15 through bulkCheckout Contracts on Ethereum (0x7d655c57f71464B6f83811C55D84009Cd9f5221C), or on Polygon (0xb99080b9407436eBb2b8Fe56D45fFA47E9bb8877), or on ZKSync (0xde21f729137c5af1b01d73af1dc21effa2b8a0d6), or appear on the Gitcoin Grants Round 15 API"
    );
  });
});
