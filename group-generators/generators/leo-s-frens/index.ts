
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
  dependsOn: ["sismo-core-team"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "dhadrien.sismo.eth": "1",
      "leo21.eth": "1",
      "bigq11.eth": "1",
      "ben.anoufa.eth": "1",
    };

    const sismoCoreTeam = await groupStore.latest(
      "sismo-core-team",
    );

    const friends = dataOperators.Union([jsonListData0, await sismoCoreTeam.data()])

    return [
      {
        name: "leo-s-frens",
        timestamp: context.timestamp,
        description: "Be part of leo's friends",
        specs: "We should have already met IRL ",
        data: friends,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
