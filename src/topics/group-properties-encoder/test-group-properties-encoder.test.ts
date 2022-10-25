import { TestGroupPropertiesEncoder } from "./test-group-properties-encoder";
import { testGroup } from "topics/group/test-groups";

describe("test group properties encoder", () => {
  let testGroupPropertiesEncoder: TestGroupPropertiesEncoder;

  beforeEach(async () => {
    testGroupPropertiesEncoder = new TestGroupPropertiesEncoder(
      {
        internalCollectionId: 0,
      },
      testGroup
    );
  });

  it("Should get the groupId", () => {
    expect(testGroupPropertiesEncoder.getGroupId()).toEqual("sismo_0_1");
  });

  it("Should get the properties", () => {
    expect(testGroupPropertiesEncoder.getProperties()).toEqual({
      generationTimestamp: 1,
      internalCollectionId: 0,
    });
  });
});
