
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["guild-community-curation"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const guildCommunityCurationGroupLatest = await groupStore.latest(
      "guild-community-curation"
    );
    
    const guildCommunityCurationData0 = dataOperators.Map(
      await guildCommunityCurationGroupLatest.data(),
      1
    );

    return [
      {
        name: "kriptoraptor",
        timestamp: context.timestamp,
        description: "Web3 Community Builders United",
        specs: "OG Only",
        data: guildCommunityCurationData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
