
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    
    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "36029", "53139", "53834", "54557", "101199", "125740" ]
    });

    return [
      {
        name: "events-in-common-with-dydymoon",
        timestamp: context.timestamp,
        description: "Data group of users attending events in common with dydymoon.lens over the past year ",
        specs: "Hold POAP from the following events: Devconnect Amsterdam (April 2022), ETH Barcelona (July 2022), ETHCC Paris (July 2022), ETHCC Hackathon (July 2022), NFT Paris (February 2023), ETH Lisbon Hackathon - Aave Booth (May 2023)",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
