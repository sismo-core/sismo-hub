import {
  GroupGenerator,
  GenerationContext,
  GenerationFrequency,
  GroupGeneratorsLibrary,
} from ".";
import { GroupStore, GroupWithData, Tags, ValueType } from "topics/group";

export const testGroup: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  data: {
    "0x411c16b4688093c81db91e192aeb5945dca6b785": 1,
    "0xfd247ff5380d7da60e9018d1d29d529664839af2": 3,
  },
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

export const groupGenerators: GroupGeneratorsLibrary = {
  "test-generator": testGroupGenerator,
};
