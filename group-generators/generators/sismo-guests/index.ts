import { Group, Tags, ValueType } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GeneratorContext,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { dataOperators } from "../../helpers/data-operators";

export default new GroupGenerator({
  generate: async (context: GeneratorContext): Promise<Group[]> => {
    const latestEthUsersGroup = await Group.store.latest("eth-users");
    const latestEthOwnersGroup = await Group.store.latest("eth-owners");
    const latestEnsVotersGroup = await Group.store.latest("ens-voters");

    const sismoGuestData = dataOperators.Join(
      await latestEthUsersGroup.data(),
      await latestEthOwnersGroup.data(),
      await latestEnsVotersGroup.data()
    );
    const sismoGuestDataOne = dataOperators.Map(sismoGuestData, 1);

    return [
      new Group({
        name: "sismo-guests",
        generationDate: new Date(context.timestamp),
        data: sismoGuestDataOne,
        valueType: ValueType.Info,
        tags: [Tags.User],
      }),
    ];
  },
  generationFrequency: GenerationFrequency.Daily,
});
