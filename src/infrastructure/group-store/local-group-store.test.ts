import Infrastructure from "../index";
import { LocalGroupStore } from "./local-group-store";
import testGroups, { exampleData } from "../../topics/group/test-groups";

describe("test local group store", () => {
  let groupStore: LocalGroupStore;

  beforeAll(async () => {
    await Infrastructure.init();
    groupStore = new LocalGroupStore("tests-group-store");
  });

  beforeEach(async () => {
    await groupStore.reset();
  });

  test("Should save multiple groups and retrieve them", async () => {
    await groupStore.save(testGroups.group1_0);
    await groupStore.save(testGroups.group1_1);
    const groups = (await groupStore.all()).map((group) => group.toJson());
    expect(groups).toHaveLength(2);
    expect(groups).toContainEqual(testGroups.group1_0.toJson());
    expect(groups).toContainEqual(testGroups.group1_1.toJson());
  });

  test("Should get valid data URL", async () => {
    const url = groupStore.dataUrl(testGroups.group1_0);
    expect(url.startsWith("file://")).toBeTruthy();
  });

  test("Should save a group and retrieve data", async () => {
    await groupStore.save(testGroups.group1_0);
    const groups = await groupStore.all();
    expect(groups).toHaveLength(1);
    expect(await groupStore.getData(groups[0])).toEqual(exampleData);
  });
});
