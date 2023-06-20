
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
  
    // const lensProvider = new dataProviders.LensProvider();
    
    // const lensProviderData0 = await lensProvider.getFollowers({
    //   profileId: "0xlegion.lens"
    // });

    const LensProviderBigQuery = new dataProviders.LensProviderBigQuery();

    // const lensProviderData0 = await LensProviderBigQuery.getFollowers({
    //   profileId: "MartinGbz"
    // });
    // // "0x4801eb5a2a6e2d04f019098364878c70a05158f1"
    // // 0x4801eB5a2A6E2D04F019098364878c70a05158F1
    // // 0x4801EB5A2A6E2D04F019098364878C70A05158F1
    // const count = await LensProviderBigQuery.getFollowersCount({
    //   profileId: "MartinGbz"
    // });

    // const lensProviderData0 = await LensProviderBigQuery.getPublicationCollectors({
    //   publicationId: "0x01c960-0x10"
    // });
    // const count = await LensProviderBigQuery.getPublicationCollectorsCount({
    //   publicationId: "0x01c960-0x10"
    // });
    
    // const lensProviderData0 = await LensProviderBigQuery.getPublicationMirrorers({
    //   publicationId: "0x01c960-0x10"
    // });
    // const count = await LensProviderBigQuery.getPublicationMirrorersCount({
    //   publicationId: "0x01c960-0x10"
    // });

    // const lensProviderData0 = await LensProviderBigQuery.getPublicationReactors({
    //   publicationId: "0x10a6-0x29-DA-1dc746f6",
    //   reaction: "UPVOTE"
    // });
    // const count = await LensProviderBigQuery.getPublicationReactorsCount({
    //   publicationId: "0x10a6-0x29-DA-1dc746f6",
    //   reaction: "UPVOTE"
    // });

    // const lensProviderData0 = await LensProviderBigQuery.getPublicationCommenters({
    //   publicationId: "0x01-0x01e3"
    // });
    // const count = await LensProviderBigQuery.getPublicationCommentersCount({
    //   publicationId: "0x01-0x01e3"
    // });

    const lensProviderData0 = await LensProviderBigQuery.getHashtagMentioners({
      hashtag: "#DeFi"
    });
    const count = await LensProviderBigQuery.getHashtagMentionersCount({
      hashtag: "#DeFi"
    });

    console.log("lensProviderData0", lensProviderData0);

    console.log("count", count);

    return [
      {
        name: "0xlegion-lens-follower",
        timestamp: context.timestamp,
        description: "Snapshot everyday. if you've just followed 0xlegion.lens, please wait 48 hours.",
        specs: "",
        data: lensProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
