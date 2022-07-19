import { ValueType, Tags, FetchedData } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { GroupType } from "../../../src/topics/group";
import { dataProviders } from "../../helpers/providers";
import { GenerationContext } from "../../../src/topics/generation-context";

// This group is constituted by all addresses that have a lens profile
// the value is 1
export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Weekly;

  async generate(context: GenerationContext): Promise<GroupType[]> {
    const lensProvider = new dataProviders.LensProvider();

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.exploreProfiles()) {
      dataProfiles[item.ownedBy] = 1;
    }

    return [
      {
        name: "lens-profiles",
        timestamp: context.timestamp,
        data: dataProfiles,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  }
}
