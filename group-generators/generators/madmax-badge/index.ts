import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "madmax-badge",
        timestamp: context.timestamp,
        description: "early zk badges",
        specs: "sismo ens,sismo poap",
        data: {
          "0xF1D84407Ad23Cb770BD2DFd854dCA23A09DBB863": "1",
          "0x88a726b14146C4d981731F37144f4F9C0f2554BB": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
