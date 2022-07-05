import { ValueType, Tags, FetchedData } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import poolyMinters from "../pooly-minters";
import sismoCitizens from "../sismo-citizens";

export default new GroupGenerator({
  name: "pooly-lawyer-minters",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const allPoolyGroup = await poolyMinters.getLatestGroup();
    await sismoCitizens.getLatestGroup();

    const data: FetchedData = {};

    // filter only on value >= 2 (lawyer or judge to avoid doxing)
    for (const address in allPoolyGroup.data) {
      if (allPoolyGroup.data[address] >= 2) {
        data[address] = 1;
      }
    }

    return new Group({
      generationDate: new Date(context.timestamp),
      data,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.Asset, Tags.NFT],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
