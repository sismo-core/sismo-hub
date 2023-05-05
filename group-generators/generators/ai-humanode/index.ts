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

  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    const galxeProvider = new dataProviders.GalxeProvider();

    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "33142", "47162" ]
    });

    const galxeProviderData2 = await galxeProvider.getCampaignHolders({
      id: "GCCBAU1hvM"
    });

    const dataUnion = dataOperators.Union([
      poapSubgraphProviderData0,
      galxeProviderData2 
    ]);

    return [
      {
        name: "ai-humanode",
        timestamp: context.timestamp,
        description: "Hold: Humanode Proficiency Test POAP, Humanode Conference 2022 POAP or HMND Initial Listing OAT",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
