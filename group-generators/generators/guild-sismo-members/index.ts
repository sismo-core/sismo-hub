import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const guildProvider = new dataProviders.GuildProvider();
    const addresses = await guildProvider.getGuildMembers({ name: "sismo" });
    return [
      {
        name: "guild-sismo-members",
        displayName: "Sismo Guild Members",
        description: "Data Group of all members of the Sismo Guild",
        specs:
          "Created by the Guild Data Provider. Contains all the members of the Sismo Guild. Value of each group member is the roleId of the role to which it belongs.",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Maintained],
      },
    ];
  },
};

export default generator;
