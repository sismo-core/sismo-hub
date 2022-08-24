import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
  GroupStore,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const allPoolyGroup = await groupStore.latest("pooly-minters");

    const data: FetchedData = {};

    // filter only on value >= 2 (lawyer or judge to avoid doxing)
    for (const address in allPoolyGroup.data) {
      const groupData = await allPoolyGroup.data();
      if (groupData[address] >= 2) {
        data[address] = 1;
      }
    }

    return [
      {
        name: "pooly-lawyer-minters",
        timestamp: context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.Asset, Tags.NFT],
      },
    ];
  },
};

export default generator;
