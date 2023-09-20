
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const team = {
      "dhadrien.sismo.eth": 1,
      "leo21.sismo.eth": 1,
      "gabinh.sismo.eth": 1,
      "charlscharls.sismo.eth": 1,
      "bigq11.eth": 1,
      "jrag.eth": 1,
      "anoufa.eth": 1,
      "f9s216.eth": 1,
      "martingbz.eth": 1,
      "zkentin.eth":1,
      "twitter:robsvensek":1,
      "kugusha.eth":1,
      "twitter:PN79161154":1
    };

    return [
      {
        name: "sismo-core-team",
        timestamp: context.timestamp,
        description: "Sismo Core Team",
        specs: "This Group consist of all Sismo core team members",
        data: team,
        valueType: ValueType.Score,
        tags: [Tags.CoreTeam, Tags.ENS],
      },
    ];
  },
};

export default generator;
