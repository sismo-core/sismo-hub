import { ValueType, Tags } from "../../../src/group";
import {
  GeneratorContext,
  GroupGenerator,
  GenerationFrequency,
} from "../../../src/group-generator";
import { Group } from "../../../src/group";
import { dataProviders } from "../../helpers/providers";
import {GroupsNames} from "../groups-names"

export default new GroupGenerator({
  name: "ens-voters",

  generate: async (context: GeneratorContext): Promise<Group> => {
    const snapshot = new dataProviders.SnapshotProvider();

    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    return new Group({
      name: GroupsNames.ENS_VOTERS,
      generationDate: new Date(context.timestamp),
      data: voters,
      valueType: ValueType.Info,
      tags: [Tags.Mainnet, Tags.Vote, Tags.User],
      generatorName: "ens-voters",
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
