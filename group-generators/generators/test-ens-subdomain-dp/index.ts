
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const ensSubdomainProvider = new dataProviders.EnsSubdomainProvider();
    
    const ensSubdomainProviderData0 = await ensSubdomainProvider.getEnsSubdomains({
      domain: "sismo"
    });

    return [
      {
        name: "test-ens-subdomain-dp",
        timestamp: context.timestamp,
        description: "test",
        specs: "test",
        data: ensSubdomainProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
