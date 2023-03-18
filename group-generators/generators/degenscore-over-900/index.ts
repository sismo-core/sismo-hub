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
    const degenscoreProvider = new dataProviders.DegenScoreProvider();
    const addresses = await degenscoreProvider.getBeaconOwnersWithScore(900);
    return [
      {
        name: "degens-score-over-900",
        description: "Get all degens with a score of minimum 900",
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
