import { GroupGenerator, GenerationContext, GenerationFrequency } from ".";
import { ClassLibrary } from "helpers";
import { GroupWithData, Tags, ValueType } from "topics/group";

export const testGroup: GroupWithData = {
  name: "test-group",
  timestamp: 1,
  data: {
    "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
    "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
  },
  valueType: ValueType.Info,
  tags: [Tags.Vote, Tags.Mainnet],
};

export class TestGroupGenerator extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    return [testGroup];
  }
}

export const groupGeneratorLibrary = new ClassLibrary<GroupGenerator>({
  "test-generator": TestGroupGenerator,
});
