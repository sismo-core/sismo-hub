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
    const receivers = await provider.getAttestations({
      creator: "0xd870a73a32d0b8c34ccf1e6098e9a26977cb605b",
      key: "Flipside_user_scoring",
      value: "\u0005",
    });

    return [
      {
        name: "optimists",
        timestamp: context.timestamp,
        description:
          "Score up to 5 points by doing things that contribute to the Optimism Network. You can attest your score on-chain using the Optimist score by Flipside https://science.flipsidecrypto.xyz/optimist/",
        specs: "You need a perfect score of 5/5 points.",
        data: receivers,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.SybilResistance],
      },
    ];
  },
};

export default generator;
