import {
  GroupGenerator,
  GenerationContext,
  GenerationFrequency,
  GroupGeneratorsLibrary,
} from ".";
import {
  AccountSource,
  GroupStore,
  GroupWithData,
  Tags,
  ValueType,
} from "topics/group";

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
  "dependent-generator": dependentGroupGenerator,
  "dependent-generator-two": dependentTwoGroupGenerator,
  "group-with-issue": groupWithIssueGenerator,
};

export const testGeneratorGenerations = {
  testGeneration1_0: {
    name: "test-generator1",
    timestamp: 1,
  },
  testGeneration1_1: {
    name: "test-generator1",
    timestamp: 2,
  },
  testGeneration2_0: {
    name: "test-generator2",
    timestamp: 1,
  },
};
