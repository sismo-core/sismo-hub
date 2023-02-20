import {
  AccountSource,
  FetchedData,
  GroupMetadata,
  ResolvedGroupWithData,
  Tags,
  ValueType,
} from "topics/group";

export const dataMigration: { [name: string]: FetchedData } = {
  group1_0: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    "test:sismo": 15,
  },
  group1_1: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 1,
    "0x5ef47FF5380d7D060E9018d1D29d529664839bb9": 1,
    "test:sismo": 15,
  },
  group2_0: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 15,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 15,
    "test:sismo": 15,
  },
};

export const testGroupsMigration: { [name: string]: GroupMetadata } = {
  group1_0: {
    name: "test-group1",
    timestamp: 1657955315,
    description: "test-description",
    specs: "test-specs",
    generatedBy: "fake-group-generator",
    accountSources: [AccountSource.ETHEREUM, AccountSource.GITHUB],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group1_1: {
    name: "test-group1",
    timestamp: 1657955315 + 60,
    description: "test-description",
    specs: "test-specs",
    generatedBy: "fake-group-generator",
    accountSources: [AccountSource.ETHEREUM],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
  group2_0: {
    name: "test-group2",
    timestamp: 1657955315 + 90,
    description: "test-description",
    specs: "test-specs",
    generatedBy: "fake-group-generator",
    accountSources: [AccountSource.GITHUB],
    valueType: ValueType.Info,
    tags: [Tags.Vote, Tags.Mainnet],
  },
};

export const testGroupsMigrationWithData: {
  [name: string]: ResolvedGroupWithData;
} = {
  group1_0: {
    ...testGroupsMigration.group1_0,
    data: dataMigration.group1_0,
    resolvedIdentifierData: dataMigration.group1_0,
  },
  group1_1: {
    ...testGroupsMigration.group1_1,
    data: dataMigration.group1_1,
    resolvedIdentifierData: dataMigration.group1_1,
  },
  group2_0: {
    ...testGroupsMigration.group2_0,
    data: dataMigration.group2_0,
    resolvedIdentifierData: dataMigration.group2_0,
  },
};
