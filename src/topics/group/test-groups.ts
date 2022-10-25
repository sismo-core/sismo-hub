import {
  AccountSource,
  Group,
  ResolvedGroupWithData,
  Tags,
  ValueType,
} from "./group.types";

const timestamp = 1657955315;
export const exampleData = {
  "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
  "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
  "test:sismo": 5,
};

export const exampleResolvedIdentifierData = {
  "0x411c16b4688093c81db91e192aeb5945dca6b785": 1,
  "0xfd247ff5380d7da60e9018d1d29d529664839af2": 3,
  "0x5151110000000000000000000000000000000001": 5,
};

export const testGroups: { [name: string]: ResolvedGroupWithData } = {
  group1_0: {
    name: "test-group1",
    timestamp: timestamp,
    data: exampleData,
    resolvedIdentifierData: exampleResolvedIdentifierData,
    accountSources: [AccountSource.ETHEREUM, AccountSource.TEST],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group1_1: {
    name: "test-group1",
    timestamp: timestamp + 60,
    data: exampleData,
    resolvedIdentifierData: exampleResolvedIdentifierData,
    accountSources: [AccountSource.TEST],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group2_0: {
    name: "test-group2",
    timestamp: timestamp + 120,
    data: exampleData,
    resolvedIdentifierData: exampleResolvedIdentifierData,
    accountSources: [AccountSource.ETHEREUM, AccountSource.TEST],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group3_0: {
    name: "non-valid-account-source-group",
    timestamp: timestamp + 160,
    data: exampleData,
    resolvedIdentifierData: exampleResolvedIdentifierData,
    // AccountSource.DEV has no resolver implemented
    accountSources: [AccountSource.DEV],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group4_0: {
    name: "non-valid-group",
    timestamp: timestamp + 160,
    data: { ...exampleData, "fake:testing": "2" },
    resolvedIdentifierData: exampleResolvedIdentifierData,
    accountSources: [AccountSource.DEV],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
};

/* istanbul ignore next */
export const testGroup: Group = {
  name: "test-group",
  timestamp: 1,
  data: async () => ({
    "0x1": 1,
    "0x2": 1,
  }),
  resolvedIdentifierData: async (data = { "0x1": 1, "0x2": 1 }) => {
    return data;
  },
  accountSources: [AccountSource.ETHEREUM],
  tags: [],
  valueType: ValueType.Info,
};
