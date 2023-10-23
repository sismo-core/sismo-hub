
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {

  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {


    const jsonListData0 = {
      "0x72e68E21b48B6AC8951a41cce4D88D87bafA3b3B": "1",
    };

    return [
      {
        name: "blockaids-testing",
        timestamp: context.timestamp,
        description: "Members of the BlockAids EthGlobal Hackathon group",
        specs: "EVM addresses with '1' as the default for ownership.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
