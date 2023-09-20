import { GroupGenerator, GenerationContext, GenerationFrequency, GroupGeneratorsLibrary } from ".";
import { AccountSource, GroupStore, GroupWithData, Tags, ValueType } from "topics/group";

export const testGroup: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411c16b4688093c81db91e192aeb5945dca6b785": 1,
    "0x45647ff5380d7da60e9018d1d29d529664839789": 1,
    "0xfd247ff5380d7da60e9018d1d29d529664839af2": 3,
  },
  accountSources: [AccountSource.ETHEREUM],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const testGroup2: GroupWithData = {
  name: "test-group-2",
  timestamp: 1,
  description: "test-description-2",
  specs: "test-specs-2",
  data: {
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": 1,
    "0x45647ff5380d7da60e9018d1d29d529664839789": 4,
    "0xfd247ff5380d7da60e9018d1d29d529664839af2": 2,
  },
  accountSources: [AccountSource.ETHEREUM],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const testGroupWithDisplayName: GroupWithData = {
  name: "test-group-display-name",
  displayName: "Name displayed",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411c16b4688093c81db91e192aeb5945dca6b785": 1,
    "0x45647ff5380d7da60e9018d1d29d529664839789": 1,
    "0xfd247ff5380d7da60e9018d1d29d529664839af2": 3,
  },
  accountSources: [AccountSource.ETHEREUM],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const dependentGroup: GroupWithData = {
  name: "dependent-group",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x123c16b4688093c81db91e192aeb5945dca6b456": 5,
    "0x45647ff5380d7da60e9018d1d29d529664839789": 7,
  },
  accountSources: [AccountSource.ETHEREUM],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const dependentGroupTwo: GroupWithData = {
  name: "dependent-group-two",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x999c16b4688093c81db91e192aeb5945dca6b999": 9,
    "0x00047ff5380d7da60e9018d1d29d529664839000": 11,
  },
  accountSources: [AccountSource.ETHEREUM],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const groupWithIssue: GroupWithData = {
  name: "group-with-issue",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  // invalid addresses
  data: {
    "0x1": 9,
    "0x2": 11,
  },
  accountSources: [AccountSource.ETHEREUM],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const testGroupGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [testGroup],
};

export const testGroupGenerator2: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [testGroup2],
};

export const testGroupWithDisplayNameGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [testGroupWithDisplayName],
};

export const dependentGroupGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["test-generator"],

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [dependentGroup],
};

export const dependentTwoGroupGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["dependent-generator", "test-generator"],

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [dependentGroupTwo],
};

export const groupWithIssueGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [groupWithIssue],
};

export const groupGenerators: GroupGeneratorsLibrary = {
  "test-generator": testGroupGenerator,
  "test-generator-2": testGroupGenerator2,
  "test-generator-with-display-name": testGroupWithDisplayNameGenerator,
  "dependent-generator": dependentGroupGenerator,
  "dependent-generator-two": dependentTwoGroupGenerator,
  "group-with-issue": groupWithIssueGenerator,
};

export const testGeneratorGenerations = {
  testGeneration1_0: {
    name: "test-generator1",
    timestamp: 1,
    lastGenerationDuration: 1,
    generationFrequency: GenerationFrequency.Once,
  },
  testGeneration1_1: {
    name: "test-generator1",
    timestamp: 2,
    lastGenerationDuration: 5,
    generationFrequency: GenerationFrequency.Daily,
  },
  testGeneration2_0: {
    name: "test-generator2",
    timestamp: 1,
    lastGenerationDuration: 10,
    generationFrequency: GenerationFrequency.Weekly,
  },
};

// update single groups metadata group tests

export const singleGroupToUpdateMetadata: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    "test:sismo": 15,
  },
  accountSources: [AccountSource.ETHEREUM, AccountSource.TEST],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

const singleGroupToUpdateMetadataGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [singleGroupToUpdateMetadata],
};

export const singleGroupGenerator: GroupGeneratorsLibrary = {
  "single-group-to-update-metadata-generator": singleGroupToUpdateMetadataGenerator,
};

// update groups metadata groups tests

export const groupToUpdateMetadata: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    "test:sismo": 15,
  },
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

const groupToUpdateMetadataGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [groupToUpdateMetadata],
};

export const groupToUpdateMetadata2: GroupWithData = {
  name: "test-group-2",
  timestamp: 1,
  description: "test-description-2",
  specs: "test-specs-2",
  data: {
    "0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6": 14,
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": 2,
    "test:sismo": 1,
  },
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

const groupToUpdateMetadataGenerator2: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [groupToUpdateMetadata2],
};

export const groupsToUpdateMetadataGenerators: GroupGeneratorsLibrary = {
  "group-to-update-metadata-generator": groupToUpdateMetadataGenerator,
  "group-to-update-metadata-generator-2": groupToUpdateMetadataGenerator2,
};

// group deletion tests

export const groupToDelete: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    "test:sismo": 15,
  },
  accountSources: [AccountSource.ETHEREUM, AccountSource.TEST],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const groupToDelete2: GroupWithData = {
  name: "test-group-2",
  timestamp: 1,
  description: "test-description",
  specs: "test-specs",
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
    "test:sismo": 15,
  },
  accountSources: [AccountSource.ETHEREUM, AccountSource.ETHEREUM],
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export const groupNotToDelete3: GroupWithData = {
  name: "test--group",
  timestamp: 1,
  description: "test--description",
  specs: "test-specs",
  data: {
    "test:sismo": 15,
  },
  accountSources: [AccountSource.TEST],
  valueType: ValueType.Info,
  tags: [Tags.Mainnet],
};

const deleteGroupGroupGenerator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    context: GenerationContext,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => [
    { ...groupToDelete, timestamp: context.timestamp },
    { ...groupToDelete2, timestamp: context.timestamp },
    { ...groupNotToDelete3, timestamp: context.timestamp },
  ],
};

export const groupGeneratorsDeletion: GroupGeneratorsLibrary = {
  "delete-groups-group-generator": deleteGroupGroupGenerator,
};
