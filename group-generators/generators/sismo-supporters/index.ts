
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  dependsOn: ["sismo-contributors-tier3-builders"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    const lensProvider = new dataProviders.LensProvider();
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    
    const jsonListData0 = {
      "0xF61CabBa1e6FC166A66bcA0fcaa83762EdB6D4Bd": "1",
      "dhadrien.sismo.eth": "1",
      "bigq11.eth": "1",
      "github:leosayous21": "1",
      "twitter:dhadrien_": "1",
      "twitter:charlscharls": "1",
      "martingbz.lens": "1",
    };
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "sismo.lens"
    });
    
    const poapSubgraphProviderData2 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "53325" ],
    });
    
    const sismoContributorsTier3BuildersGroupLatest = await groupStore.latest(
      "sismo-contributors-tier3-builders"
    );
    
    const sismoContributorsTier3BuildersData3 = dataOperators.Map(
      await sismoContributorsTier3BuildersGroupLatest.data(),
      1
    );
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      lensProviderData1,
      poapSubgraphProviderData2,
      sismoContributorsTier3BuildersData3 
    ]);

    return [
      {
        name: "sismo-supporters",
        timestamp: context.timestamp,
        description: "Group of Sismo Supporters",
        specs: "Follow Sismo on Lens, have claimed the EthCC Sismo booth POAP, be a Sismo Contributor level 3, be a Sismo core team member.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
