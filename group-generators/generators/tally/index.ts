import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const TallyProvider = new dataProviders.TallyProvider();

    const input = {
      name: "Aave",
    };
    const tallyGetGovernanceProposers = await TallyProvider.getGovernanceProposers(input);

    console.log("tally", tallyGetGovernanceProposers);
    return [
      {
        name: "example-tally",
        timestamp: context.timestamp,
        description: "tally gov",
        specs: "okok",
        data: tallyGetGovernanceProposers,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;
