import Infrastructure from "../index";
import { LocalFileStore } from "../file-store";
import { LocalGroupStore } from "./local-group-store";
import { Group, Tags, ValueType } from "../../topics/group";

describe("test local group store", () => {
  let fileStore: LocalFileStore;
  let groupStore: LocalGroupStore;

  beforeAll(async () => {
    await Infrastructure.init();
    fileStore = new LocalFileStore("tests-group-store");
    groupStore = new LocalGroupStore(fileStore);
  });

  beforeEach(async () => {
    await fileStore.reset();
  });

  test("Should save multiple groups and retrieve them", async () => {
    const group1 = new Group({
      name: "test-group",
      timestamp: 1657874155,
      data: {},
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    const group2 = new Group({
      name: "test-group",
      timestamp: 1657874156,
      data: {},
      valueType: ValueType.Info,
      tags: [Tags.Vote, Tags.Mainnet],
    });
    await groupStore.save(group1);
    await groupStore.save(group2);
    const groups = (await groupStore.all()).map((group) => group.toJson());
    expect(groups).toHaveLength(2);
    expect(groups).toContainEqual(group1.toJson());
    expect(groups).toContainEqual(group2.toJson());
  });
});
