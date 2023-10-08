
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
      domain: "urbe.eth"
    });

    return [
      {
        name: "urbe-eth-subdomain-holders",
        timestamp: context.timestamp,
        description: "Urbe.ETH subdomain holders",
        specs: "Urbe.ETH subdomain holders",
        data: ensSubdomainProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
