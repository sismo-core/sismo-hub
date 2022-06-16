import { ValueType, Tags } from "../../../src/list";
import {
  GeneratorContext,
  ListGenerator,
  GenerationFrequency,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";
import { dataProviders } from "../../helpers/providers";

export default new ListGenerator({
  // id of the listGenerator.
  id: 2,
  // name of the listGenerator.
  name: "ens-voters",

  // generator function that will be executed at the generationFrequency
  generate: async (context: GeneratorContext): Promise<List> => {
    // instantiate the snapshot provider
    const snapshot = new dataProviders.SnapshotProvider();

    // fetch all voters in the ens.eth space
    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    // construct your list
    return new List({
      generationDate: new Date(context.timestamp),
      data: voters,
      valueType: ValueType.Info,
      tags: [Tags.Mainnet, Tags.Vote, Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
