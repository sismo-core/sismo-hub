import { Group, GroupWithData, groupMetadata } from "./src/topics/group";

jest.setTimeout(30000);
process.setMaxListeners(20);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R> {
      toBeSameGroup(expected: Group | GroupWithData): CustomMatcherResult;
      toContainGroup(expected: Group | GroupWithData): CustomMatcherResult;
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
  toContainGroup(
    received: (Group | GroupWithData)[],
    group: Group | GroupWithData
  ) {
    expect(received.map(() => groupMetadata(group))).toContainEqual(
      groupMetadata(group)
    );
    return {
      pass: true,
      message: () => "",
    };
  },
});
