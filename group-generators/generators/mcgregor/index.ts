
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  dependsOn: ["op-airdrop"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const opAirdropGroupLatest = await groupStore.latest(
      "op-airdrop"
    );
    
    const opAirdropData0 = dataOperators.Map(
      await opAirdropGroupLatest.data(),
      1
    );

    return [
      {
        name: "mcgregor",
        timestamp: context.timestamp,
        description: "Top $OP",
        specs: "Top $OP Airdrop",
        data: opAirdropData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
