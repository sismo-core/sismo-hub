import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();

    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "Miscellaneous.lens",
    });

    return [
      {
        name: "frens-of-moses",
        timestamp: context.timestamp,
        description: "Be a follower of Miscellaneous.Lens",
        specs: "Head to lenster.XYZ and follow miscellaneous.Lens",
        data: {
          ...lensProviderData0,
          "0xA083B801b4256215c61145f828a60BA949434577": 1,
          "0x52016079F88269d2Fed8ad9D9D0E10DA5a6f9316": 1,
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
