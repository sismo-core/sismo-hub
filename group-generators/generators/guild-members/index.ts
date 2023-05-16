
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const guildProvider = new dataProviders.GuildProvider();
    
    const guildProviderData0 = await guildProvider.getGuildMembers({
      name: "decentragora"
    });

    return [
      {
        name: "guild-members",
        timestamp: context.timestamp,
        description: "Data group of DecentrAgora guild members",
        specs: "finds eligible address that are in the DecentrAgora guild",
        data: guildProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
