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
    const rep3Provider = new dataProviders.Rep3Provider();

    const input = {
      contract: "0x4fc27be45d5ca34f33c52f420d23c29b72352992",
      level: "all",
    };

    const rep3Data = await rep3Provider.getMembershipHolders(input);

    return [
      {
        name: "example-rep3",
        timestamp: context.timestamp,
        description: "e.g. get rep3 holders for all levels",
        specs: "0x4fc27be45d5ca34f33c52f420d23c29b72352992",
        data: rep3Data,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};

export default generator;
