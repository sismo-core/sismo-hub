import { Group, Tags, ValueType } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { dataOperators } from "../../helpers/data-operators";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Daily;

  async generate(): Promise<Group[]> {
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
        timestamp: this.context.timestamp,
        data: sismoGuestDataOne,
        valueType: ValueType.Info,
        tags: [Tags.User],
      }),
    ];
  }
}
