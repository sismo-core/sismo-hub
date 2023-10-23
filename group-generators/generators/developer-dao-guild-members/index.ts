
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
  
    const guildProvider = new dataProviders.GuildProvider();
    
    const guildProviderData0 = await guildProvider.getGuildMembers({
      name: "dd"
    });

    return [
      {
        name: "developer-dao-guild-members",
        timestamp: context.timestamp,
        description: "All the members of the DD qualify",
        specs: "DD",
        data: guildProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
