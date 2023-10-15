
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const lensBigQueryProvider = new dataProviders.LensBigQueryProvider();
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    
    const jsonListData0 = {
      "0x6d7b8161eb2E31BC77e0e73571e55441B0636EbD": "1",
    };
    
    const jsonListData1 = {
      "0xCB5f2A813F4Dfc5c85DbDD79DA5fa2dcEeC78cBd": "2",
    };
    
    const lensBigQueryProviderData2 = await lensBigQueryProvider.getFollowers({
      profileId: "sismo.lens"
    });
    
    const poapSubgraphProviderData3 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "53325" ]
    });
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1,
      lensBigQueryProviderData2,
      poapSubgraphProviderData3 
    ]);

    return [
      {
        name: "sismo-supporters-ptest",
        timestamp: context.timestamp,
        description: "sismo-supporters",
        specs: "sismo-supporters",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
