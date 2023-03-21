import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const guildProvider = new dataProviders.GuildProvider();
    const addresses = await guildProvider.getGuildMembers({ name: "sismo" });
    return [
      {
        name: "guild-sismo-member",
        description: "Be a Sismo member on Guild.xyz",
        specs: "Get all members of Sismo Guild",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
