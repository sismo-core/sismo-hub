import { dataOperators } from "@group-generators/helpers/data-operators";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Daily;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const latestEthUsersGroup = await this.groupStore.latest("eth-users");
    const latestEthOwnersGroup = await this.groupStore.latest("eth-owners");
    const latestEnsVotersGroup = await this.groupStore.latest("ens-voters");

    const sismoGuestData = dataOperators.Join(
      await latestEthUsersGroup.data(),
      await latestEthOwnersGroup.data(),
      await latestEnsVotersGroup.data()
    );
    const sismoGuestDataOne = dataOperators.Map(sismoGuestData, 1);

    return [
      {
        name: "sismo-guests",
        timestamp: context.timestamp,
        data: sismoGuestDataOne,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  }
}
