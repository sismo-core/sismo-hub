import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const sismoGenesisTeam = {
      "dhadrien.sismo.eth": 1,
      "leo21.sismo.eth": 1,
      "gabinh.sismo.eth": 1,
      "charlscharls.sismo.eth": 1,
      "samsb.sismo.eth": 1,
      "bigq11.eth": 1,
      "jrag.eth": 1,
      "anoufa.eth": 1,
      "f9s216.eth": 1
    };

    return [
      {
        name: "sismo-genesis-team",
        timestamp: context.timestamp,
        description: "Sismo Genesis Team",
        specs: "",
        data: sismoGenesisTeam,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
