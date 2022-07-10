import { ValueType, Tags } from "../../../src/topics/group";
import {
  GeneratorContext,
  GroupGenerator,
  GenerationFrequency,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group";
import { dataProviders } from "../../helpers/providers";

export default new GroupGenerator({
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const snapshot = new dataProviders.SnapshotProvider();

    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    return [
      new Group({
        name: "ens-voters",
        generationDate: new Date(context.timestamp),
        data: voters,
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.Vote, Tags.User],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Once,
});
