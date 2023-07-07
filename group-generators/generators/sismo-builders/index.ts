import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["sismo-hackathons-participants", "sismo-community-contributors", "sismo-github-contributors"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {

    const sismoHackathonsParticipants = await groupStore.latest("sismo-hackathons-participants");
    const sismoHackathonsParticipantsData = dataOperators.Map(await sismoHackathonsParticipants.data(), 1);

    const sismoCommunityContributors = await groupStore.latest("sismo-community-contributors");
    const sismoCommunityContributorsData = dataOperators.Map(await sismoCommunityContributors.data(), 1);

    const sismoGithubContributors = await groupStore.latest("sismo-github-contributors");
    const sismoGithubContributorsData = dataOperators.Map(await sismoGithubContributors.data(), 1);

    const builders = dataOperators.Union([sismoHackathonsParticipantsData, sismoCommunityContributorsData, sismoGithubContributorsData]);

    return [
      {
        name: "sismo-builders",
        timestamp: context.timestamp,
        description: "Sismo Builders",
        specs: "This Group consist of all Sismo builders containing: Sismo hackathons participants, Sismo Community contributors, Sismo GitHub contributors",
        data: builders,
        valueType: ValueType.Score,
        tags: [Tags.Builders, Tags.Maintained],
      },
    ];
  },
};

export default generator;
