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

export default new GroupGenerator({
  name: "sismo-guests",
  generate: async (context: GeneratorContext): Promise<Group> => {
    const latestEthUsersGroup = await ethUsers.getLatestGroup();
    const latestEthOwnersGroup = await ethOwners.getLatestGroup();
    const latestEnsVotersGroup = await ensVoters.getLatestGroup();

    const sismoGuestData = dataOperators.Join(
      latestEthUsersGroup.data,
      latestEthOwnersGroup.data,
      latestEnsVotersGroup.data
    );
    const sismoGuestDataOne = dataOperators.Map(sismoGuestData, 1);

    // construct your group
    return new Group({
      generationDate: new Date(context.timestamp),
      data: sismoGuestDataOne,
      valueType: ValueType.Info,
      tags: [Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Daily,
});
