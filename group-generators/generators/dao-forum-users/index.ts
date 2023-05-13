
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const discourseProvider = new dataProviders.DiscourseProvider();
    const gnosisForumUsers = await discourseProvider.getAllUsersFromAPI({
      url: "https://forum.gnosis.io/"
    });

    return [
      {
        name: "gnosis-forum-users",
        timestamp: context.timestamp,
        description: "Discourse user: Gnosis Forum",
        specs: "Anyone that is a Gnosis Forum user.",
        data: gnosisForumUsers,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
