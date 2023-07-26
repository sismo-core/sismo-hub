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
    const unlockProvider = new dataProviders.UnlockSubgraphProvider();
    const input = {
      lockAddress: "0x02699D0D6524a3322018E0C4fF021baC4Dbe616a",
      chain: "1",
    };

    const unlockData = await unlockProvider.getKeysInLock(input);
    return [
      {
        name: "example-unlock",
        timestamp: context.timestamp,
        description:
          "e.g. get unlock keys for lock 0x02699D0D6524a3322018E0C4fF021baC4Dbe616a ",
        specs: "0x02699D0D6524a3322018E0C4fF021baC4Dbe616a",
        data: unlockData,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};
export default generator;
