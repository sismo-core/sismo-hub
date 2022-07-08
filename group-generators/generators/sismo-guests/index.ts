import { Group, Tags, ValueType } from "../../../src/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/group-generator";
import ethUsers from "../eth-users";
import ethOwners from "../eth-owners";
import ensVoters from "../ens-voters";
import { dataOperators } from "../../helpers/data-operators";
import {GroupsNames} from "../groups-names"

export default new GroupGenerator({
  name: "sismo-guests",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const latestEthUsersGroup = await ethUsers.getLatestGroup();
    const latestEthOwnersGroup = await ethOwners.getLatestGroup();
    const latestEnsVotersGroup = await ensVoters.getLatestGroup();

    const sismoGuestData = dataOperators.Join(
      await latestEthUsersGroup.data(),
      await latestEthOwnersGroup.data(),
      await latestEnsVotersGroup.data()
    );
    const sismoGuestDataOne = dataOperators.Map(sismoGuestData, 1);

    return new Group({
      name: GroupsNames.SISMO_GUESTS,
      generationDate: new Date(context.timestamp),
      data: sismoGuestDataOne,
      valueType: ValueType.Info,
      tags: [Tags.User],
      generatorName: "sismo-guests",
    });
  },
  generationFrequency: GenerationFrequency.Daily,
});
