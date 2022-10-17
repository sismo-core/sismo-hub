import { AccountSource, GroupMetadata, Tags, ValueType } from "topics/group";

export const testGroupsMigration: { [name: string]: GroupMetadata } = {
  group1_0: {
    name: "test-group1",
    timestamp: 1657955315,
    accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group1_1: {
    name: "test-group1",
    timestamp: 1657955315 + 60,
    accountSources: [AccountSource.TWITTER],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group2_0: {
    name: "test-group2",
    timestamp: 1657955315 + 90,
    accountSources: [AccountSource.GITHUB],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
};
