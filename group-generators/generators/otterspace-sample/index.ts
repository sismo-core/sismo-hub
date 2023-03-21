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
    const otterspaceProvider = new dataProviders.OtterspaceProvider();
    const addresses = await otterspaceProvider.getBadgeHolders({
      id: "bafyreicl3unvw6tvzjfduvrhxbfi74gsob6mpf6ekn3s2nkopqz2phtx7e",
    });
    return [
      {
        name: "otterspace-sample",
        description: "Have sample badge on Otterspace",
        specs: "Get all holders of Otterspace badge",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
