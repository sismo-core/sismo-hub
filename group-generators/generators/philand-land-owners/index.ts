
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
    
    const guildProviderData0 = await guildProvider.getRoleMembers({
      id: 37580
    });

    return [
      {
        name: "philand-land-owners",
        timestamp: context.timestamp,
        description: "Data Group of users having the Guild.xyz 'Land Owner' role",
        specs: "Philand users who has claimed the Chess Phi object, joined and claimed the 'Land Owner' role on https://guild.xyz/phi",
        data: guildProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
