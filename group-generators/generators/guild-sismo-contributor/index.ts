import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once, // weekly => once (while guild API is not fixed)

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const guildProvider = new dataProviders.GuildProvider();
    const addresses = await guildProvider.getRoleMembers({ id: 16812 });
    return [
      {
        name: "guild-sismo-contributor-role",
        description: "Be a Sismo contributor on Guild.xyz",
        specs: "Get all members of role 16812",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
