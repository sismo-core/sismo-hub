
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
  
    const wiwBadgeProvider = new dataProviders.WiwBadgeProvider();
    
    const wiwBadgeProviderData0 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "&quot;913a46ffe78e67fda4179d67a87044150b0ac5789d44dbc5ff30854b74944996&quot;"
    });

    return [
      {
        name: "test",
        timestamp: context.timestamp,
        data: wiwBadgeProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
