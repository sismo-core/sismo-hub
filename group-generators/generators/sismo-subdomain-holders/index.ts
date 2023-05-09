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
    const ensSubdomainProvider = new dataProviders.EnsSubdomainProvider();
    const params = {
      subdomainId:
        "sismo.eth0x433c99d8edd0cf295e2314840cf7f62ca9b23c2d6004e72c706022297ae716ab",
    };

    const groupData = await ensSubdomainProvider.getEnsSubdomains(params);

    return [
      {
        name: "sismo-subdomain-holders",
        timestamp: context.timestamp,
        description: "get all holders of a sismo.eth subdomain",
        specs: "",
        data: groupData,
        valueType: ValueType.Score,
        tags: [Tags.BadgeHolders],
      },
    ];
  },
};
export default generator;
