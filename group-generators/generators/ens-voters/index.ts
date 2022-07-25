import { ValueType, Tags, GroupType } from "../../../src/topics/group";
import {
  GroupGenerator,
  GenerationFrequency,
} from "../../../src/topics/group-generator";
import { dataProviders } from "../../helpers/providers";
import { GenerationContext } from "../../../src/topics/generation-context";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(context: GenerationContext): Promise<GroupType[]> {
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
