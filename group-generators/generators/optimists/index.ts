import { AttestationStationProvider } from "@group-generators/helpers/data-providers/atst";
import { ValueType, Tags, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const provider = new AttestationStationProvider();
    const receivers = await provider.getAttestations(
      "Flipside_user_scoring",
      "\u0005"
    );

    return [
      {
        name: "optimists",
        timestamp: context.timestamp,
        description:
          "Attest your Optimist score on-chain with a perfect score of 5.",
        specs: "Score a perfect 5 point score on the Flipside Optimist score",
        data: receivers,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.SybilResistance],
      },
    ];
  },
};

export default generator;
