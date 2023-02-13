import { Group, GroupWithData, groupMetadata } from "./src/topics/group";
import { groupSnapshotMetadata } from "topics/group-snapshot/group-snapshot";
import { GroupSnapshot, GroupSnapshotWithData } from "topics/group-snapshot/group-snapshot.types";

jest.setTimeout(30000);
process.setMaxListeners(20);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toBeSameGroup(expected: Group | GroupWithData): CustomMatcherResult;
      toContainGroup(expected: Group | GroupWithData): CustomMatcherResult;
      toBeSameGroupSnapshot(expected: GroupSnapshot | GroupSnapshotWithData): CustomMatcherResult;
      toContainGroupSnapshot(expected: GroupSnapshot | GroupSnapshotWithData): CustomMatcherResult;
    }
  }
}

expect.extend({
  toBeSameGroup(received: Group | GroupWithData, group: Group | GroupWithData) {
    expect(groupMetadata(received)).toEqual(groupMetadata(group));
    return {
      pass: true,
      message: () => "",
    };
  },
  toContainGroup(received: (Group | GroupWithData)[], group: Group | GroupWithData) {
    expect(received.map((group) => groupMetadata(group))).toContainEqual(groupMetadata(group));
    return {
      pass: true,
      message: () => "",
    };
  },
  toBeSameGroupSnapshot(
    received: GroupSnapshot | GroupSnapshotWithData,
    groupSnapshot: GroupSnapshot | GroupSnapshotWithData
  ) {
    expect(groupSnapshotMetadata(received)).toEqual(groupSnapshotMetadata(groupSnapshot));
    return {
      pass: true,
      message: () => "",
    };
  },
  toContainGroupSnapshot(
    received: (GroupSnapshot | GroupSnapshotWithData)[],
    groupSnapshot: GroupSnapshot | GroupSnapshotWithData
  ) {
    expect(received.map((groupSnapshot) => groupSnapshotMetadata(groupSnapshot))).toContainEqual(
      groupSnapshotMetadata(groupSnapshot)
    );
    return {
      pass: true,
      message: () => "",
    };
  },
});
