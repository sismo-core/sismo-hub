import { dataOperators } from "@group-generators/helpers/data-operators";
import { GroupStore, GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const latestEthUsersGroup = await groupStore.latest("eth-users");
    const latestEthOwnersGroup = await groupStore.latest("eth-owners");
    const latestEnsVotersGroup = await groupStore.latest("ens-voters");

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
  },
};

export default generator;
