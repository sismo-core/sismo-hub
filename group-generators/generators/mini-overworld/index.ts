
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
      name: "common-user-guild"
    });

    return [
      {
        name: "mini-overworld",
        timestamp: context.timestamp,
        description: "To get this badge, you need to join my guild: https://guild.xyz/common-user-guild",
        specs: "",
        data: guildProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
