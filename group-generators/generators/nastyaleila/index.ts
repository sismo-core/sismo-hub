
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const lensProvider = new dataProviders.LensProvider();
    
    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "sismo.lens"
    });

    return [
      {
        name: "nastyaleila",
        timestamp: context.timestamp,
        description: "Be a Sismo core team member, Sismo contributor, or follow Sismo on Lens.",
        specs: "To mint this ZK Badge, users must own an Ethereum, GitHub, or Twitter account connected to the Sismo core team, prove they contribute to Sismo by holding a Sismo Contributor ZKBadge, or follow @sismo.lens on Lens protocol.",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
