import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();

    const poapSubgraphProviderData0 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [
        64130, 63629, 48879, 51912, 44747, 47227, 61296, 52411, 52445, 49692, 46534, 62034, 60770,
        58179, 57129, 54484, 54666, 54885, 53810, 54021, 53655,
      ],
    });

    return [
      {
        name: "zklend-poap-contributor",
        timestamp: context.timestamp,
        description: "You have to own zkLend Poap's to mint this ZK Badge",
        specs: "You need to own any of this POAP's #64130 #63629 #48879 #51912 #44747 #47227 #61296 #52411 #52445 #49692 #46534 #62034 #60770 #58179 #57129 #54484 #54666 #54885 #53810 #54021 #53655 ",
        data: poapSubgraphProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
