import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
} from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { GenerationContext } from "../../../src/topics/generation-context";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const allPoolyGroup = await this.groupStore.latest("pooly-minters");

    const data: FetchedData = {};

    // filter only on value >= 2 (lawyer or judge to avoid doxing)
    for (const address in allPoolyGroup.data) {
      const groupData = await allPoolyGroup.data();
      if (groupData[address] >= 2) {
        data[address] = 1;
      }
    }

    return [
      {
        name: "pooly-lawyer-minters",
        timestamp: context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.Asset, Tags.NFT],
      },
    ];
  }
}
