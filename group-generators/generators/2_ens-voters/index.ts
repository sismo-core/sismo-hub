import { ValueType, Tags } from "../../../src/group";
import {
  GeneratorContext,
  GroupGenerator,
  GenerationFrequency,
} from "../../../src/group-generator";
import { Group } from "../../../src/group/group";
import { dataProviders } from "../../helpers/providers";

export default new GroupGenerator({
  // id of the groupGenerator.
  id: 2,
  // name of the groupGenerator.
  name: "ens-voters",

  // generator function that will be executed at the generationFrequency
  generate: async (context: GeneratorContext): Promise<Group> => {
    // instantiate the snapshot provider
    const snapshot = new dataProviders.SnapshotProvider();

    // fetch all voters in the ens.eth space
    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    // construct your group
    return new Group({
      generationDate: new Date(context.timestamp),
      data: voters,
      valueType: ValueType.Info,
      tags: [Tags.Mainnet, Tags.Vote, Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
