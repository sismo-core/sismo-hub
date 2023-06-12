import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const gitPoapProvider = new dataProviders.GitPoapProvider();
    const addresses = await gitPoapProvider.getGitPoapHoldersByEventId({gitPoapEventId: "831"});
    return [
      {
        name: "gitpoap-2023-sismo-contributor",
        description: "Be a Sismo Contributor in 2023",
        specs: "Get all GitPOAP holder of the event id 831",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
