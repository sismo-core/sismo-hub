import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const TallyProvider = new dataProviders.TallyProvider();

    const input = {
      governance: "Aave",
      // proposalId: 315,
    };
    const tallyGetGovernanceProposers = await TallyProvider.getGovernanceProposers(input);

    return [
      {
        name: "example-tally",
        timestamp: context.timestamp,
        description: "Tally governance",
        specs: "",
        data: tallyGetGovernanceProposers,
        valueType: ValueType.Score,
        tags: [Tags.Vote],
      },
    ];
  },
};

export default generator;
