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
    const degenscoreProvider = new dataProviders.GitPoapProvider();
    const addresses = await degenscoreProvider.getGitPoapHoldersByEventId({gitPoapEventId: "37428"});
    return [
      {
        name: "poap-holder-of-37428",
        description: "Get all POAP holder of the event id 37428",
        specs: "",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
