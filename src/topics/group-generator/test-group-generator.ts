import { GenerationContext } from "../generation-context";
import { GroupWithData, Tags, ValueType } from "../group";
import { GroupGenerator, GenerationFrequency } from "./";

export default class TestGroupGenerator extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    return [
      {
        name: "test-group",
        timestamp: context.timestamp,
        data: {
          "0x411C16b4688093C81db91e192aeB5945dCA6B785": 1,
          "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": 3,
        },
        valueType: ValueType.Info,
        tags: [Tags.Vote, Tags.Mainnet],
      },
    ];
  }
}
