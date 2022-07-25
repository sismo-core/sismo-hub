import "reflect-metadata";
import { createTestGroups } from "../../topics/group/test-groups";
import { getTestLocalContainer } from "../container";

describe("test local group store", () => {
  const container = getTestLocalContainer();
  const testGroups = createTestGroups(container);

  it("Should get valid data URL", async () => {
    expect(testGroups.group1_0.dataUrl.startsWith("file://")).toBeTruthy();
  });
});
