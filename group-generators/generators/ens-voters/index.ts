import { ValueType, Tags } from "../../../src/topics/group";
import {
  GroupGenerator,
  GenerationFrequency,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group";
import { dataProviders } from "../../helpers/providers";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(): Promise<Group[]> {
    const snapshot = new dataProviders.SnapshotProvider();

    const voters = await snapshot.queryAllVoters({
      space: "ens.eth",
    });

    return [
      new Group({
        name: "ens-voters",
        timestamp: this.context.timestamp,
        data: voters,
        valueType: ValueType.Info,
        tags: [Tags.Mainnet, Tags.Vote, Tags.User],
      }),
    ];
  }
}
