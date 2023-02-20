import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();

    const lensProviderData0 = await lensProvider.getFollowers({
      profileId: "hearts.lens",
    });

    return [
      {
        name: "all-for-web3",
        timestamp: context.timestamp,
        description: "you need hold lens handle AND follow hearts.lens to be eligible.",
        specs:
          "you can claim OR buy lens hanle then follow hearts.lens on https://lenster.xyz. simple huh?",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
