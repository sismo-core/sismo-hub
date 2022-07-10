import { ValueType, Tags, FetchedData } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group";
import { dataProviders } from "../../helpers/providers";

// This group is constituted by all addresses that have a lens profile
// the value is 1
export default new GroupGenerator({
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const lensProvider = new dataProviders.LensProvider();

    const dataProfiles: FetchedData = {};
    for await (const item of lensProvider.exploreProfiles()) {
      dataProfiles[item.ownerBy] = 1;
    }

    return [
      new Group({
        name: "lens-profiles",
        generationDate: new Date(context.timestamp),
        data: dataProfiles,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      }),
    ];
  },

  generationFrequency: GenerationFrequency.Weekly,
});
