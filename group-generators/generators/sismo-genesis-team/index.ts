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
      "f9s216.eth": 1,
      "martingbz.eth": 1,
      // zkentin
      "0x6aa9b699fFC8525BB157949f0696c11246aDE7CA": 1,
      // rob
      "0xd217e246eA142DE6548cfE27256c12bD446742d7": 1,
      // sacha
      "0x8379bD16381620914d8fA3d535F6Ca9eF23ece53": 1
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
