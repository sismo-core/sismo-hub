import { dataProviders } from "@group-generators/helpers/data-providers";
import { ValueType, GroupWithData, Tags } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const ensSubdomainProvider = new dataProviders.EnsSubdomainProvider();
    const params = {
      domain: "sismo",
    };

    const groupData = await ensSubdomainProvider.getEnsSubdomains(params);

    return [
      {
        name: "sismo-subdomain-holders",
        timestamp: context.timestamp,
        description: "Data Group of all .sismo.eth ENS subdomain owners",
        specs: "Created by the ENS Subdomain Data Provider. Contains all .sismo.eth ENS subdomain owners.",
        data: groupData,
        valueType: ValueType.Score,
        tags: [Tags.Maintained],
      },
    ];
  },
};
export default generator;
