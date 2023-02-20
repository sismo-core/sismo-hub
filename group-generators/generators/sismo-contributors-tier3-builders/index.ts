import { dataOperators } from "@group-generators/helpers/data-operators";
import {
  Tags,
  ValueType,
  GroupWithData,
  AccountSource,
  GroupStore,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["sismo-diggers", "sismo-genesis-team"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    // we add Sismo Diggers group in the Sismo Contributors Tier3 group
    const latestSismoDiggersGroup = await groupStore.latest("sismo-diggers");
    const sismoDiggersData = dataOperators.Map(
      await latestSismoDiggersGroup.data(),
      1
    );

    // we add Sismo Team in the Sismo Contributors Tier3 group
    const latestSismoGenesisTeam = await groupStore.latest(
      "sismo-genesis-team"
    );
    const sismoGenesisTeam = dataOperators.Map(
      await latestSismoGenesisTeam.data(),
      1
    );

    const sismoContributorsTier3Data = dataOperators.Union([
      sismoDiggersData,
      sismoGenesisTeam,
    ]);

    return [
      {
        name: "sismo-contributors-tier3-builders",
        timestamp: context.timestamp,
        description: "Sismo Contributors Tier3 Builders",
        specs: "",
        data: sismoContributorsTier3Data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.POAP, Tags.CoreTeam],
      },
    ];
  },
};

export default generator;
