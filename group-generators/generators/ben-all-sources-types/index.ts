
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
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["proof-of-attendance-main-events","ben-friends",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    const snapshotProvider = new dataProviders.SnapshotProvider();
    const lensProvider = new dataProviders.LensProvider();
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    const hiveProvider = new dataProviders.HiveProvider();
    const restProvider = new dataProviders.RestProvider();
    
    const proofOfAttendanceMainEventsGroupLatest = await groupStore.latest(
      "proof-of-attendance-main-events"
    );
    
    const proofOfAttendanceMainEventsData0 = dataOperators.Map(
      await proofOfAttendanceMainEventsGroupLatest.data(),
      1
    );
    
    const benFriendsGroupLatest = await groupStore.latest(
      "ben-friends"
    );
    
    const benFriendsData1 = dataOperators.Map(
      await benFriendsGroupLatest.data(),
      1
    );
    
    const jsonListData2 = {
      "twitter:Baoufa": "1",
    };
    
    const githubProviderData3 = await githubProvider.getRepositoriesContributors({
      repositories: [ "sismo-core/sismo-hub" ],
    });
    
    const snapshotProviderData4 = await snapshotProvider.querySpaceVoters({
      space: "sismo.eth"
    });
    
    const lensProviderData5 = await lensProvider.getFollowers({
      profileId: "sismo.lens"
    });
    
    const lensProviderData6 = await lensProvider.getWhoCollectedPublication({
      publicationId: "0x26e5-0x03"
    });
    
    const lensProviderData7 = await lensProvider.getWhoMirroredPublication({
      publicationId: "0x26e5-0x03"
    });
    
    const poapSubgraphProviderData8 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "63400", "57318" ],
    });
    
    const hiveProviderData9 = await hiveProvider.getInfluencersFromClusterWithMinimumFollowers({
      clusterName: "Ethereum"
    });
    
    const restProviderData10 = await restProvider.getAccountsFromAPI({
      url: "https://mycustom.com/api"
    });
    
    const dataUnion = dataOperators.Union([ 
      proofOfAttendanceMainEventsData0,
      benFriendsData1,
      jsonListData2,
      githubProviderData3,
      snapshotProviderData4,
      lensProviderData5,
      lensProviderData6,
      lensProviderData7,
      poapSubgraphProviderData8,
      hiveProviderData9,
      restProviderData10 
    ]);

    return [
      {
        name: "ben-all-sources-types",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
