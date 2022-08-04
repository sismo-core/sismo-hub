import { dataProviders } from "@group-generators/helpers/providers";
import { GenerationContext } from "topics/generation-context";
import { ValueType, Tags, GroupWithData } from "topics/group";
import { GroupGenerator, GenerationFrequency } from "topics/group-generator";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(context: GenerationContext): Promise<GroupWithData[]> {
    const snapshot = new dataProviders.SnapshotProvider();

    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    return [
      {
        name: "ens-voters",
        timestamp: context.timestamp,
        data: voters,
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.Vote, Tags.User],
      },
    ];
  }
}
