
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
  dependsOn: ["nouns-dao-nft-holders","ens-domains-holders"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const nounsDaoNftHoldersGroupLatest = await groupStore.latest(
      "nouns-dao-nft-holders"
    );
    
    const nounsDaoNftHoldersData0 = dataOperators.Map(
      await nounsDaoNftHoldersGroupLatest.data(),
      1
    );
    
    const ensDomainsHoldersGroupLatest = await groupStore.latest(
      "ens-domains-holders"
    );
    
    const ensDomainsHoldersData1 = dataOperators.Map(
      await ensDomainsHoldersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([
      nounsDaoNftHoldersData0,
      ensDomainsHoldersData1 
    ]);

    return [
      {
        name: "testtest",
        timestamp: context.timestamp,
        description: "d",
        specs: "d",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
