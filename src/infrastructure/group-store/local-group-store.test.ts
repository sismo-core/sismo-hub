import Infrastructure from "../index";
import { LocalFileStore } from "../file-store";
import { LocalGroupStore } from "./local-group-store";
import testGroups from "../../topics/group/test-groups";

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
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    const groups = (await groupStore.all()).map((group) => group.toJson());
    expect(groups).toHaveLength(2);
    expect(groups).toContainEqual(testGroups.group1_0.toJson());
    expect(groups).toContainEqual(testGroups.group1_1.toJson());
  });
});
