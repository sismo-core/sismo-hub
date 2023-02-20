
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
  dependsOn: ["sismo-early-users"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const sismoEarlyUsersGroupLatest = await groupStore.latest(
      "sismo-early-users"
    );
    
    const sismoEarlyUsersData0 = dataOperators.Map(
      await sismoEarlyUsersGroupLatest.data(),
      1
    );

    return [
      {
        name: "anywhere-golden-customer",
        timestamp: context.timestamp,
        description: "Be part of anywhere's golden customer",
        specs: "Access to anywhere's yearly party",
        data: sismoEarlyUsersData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
