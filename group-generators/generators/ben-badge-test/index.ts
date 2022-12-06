
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
  dependsOn: ["proof-of-humanity","neoneo-badge",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    const hiveProvider = new dataProviders.HiveProvider();
    const lensProvider = new dataProviders.LensProvider();
    const poapSubgraphProvider = new dataProviders.PoapSubgraphProvider();
    const restProvider = new dataProviders.RestProvider();
    const snapshotProvider = new dataProviders.SnapshotProvider();
    
    const proofOfHumanityGroupLatest = await groupStore.latest(
      "proof-of-humanity"
    );
    
    const proofOfHumanityData0 = dataOperators.Map(
      await proofOfHumanityGroupLatest.data(),
      1
    );
    
    const neoneoBadgeGroupLatest = await groupStore.latest(
      "neoneo-badge"
    );
    
    const neoneoBadgeData1 = dataOperators.Map(
      await neoneoBadgeGroupLatest.data(),
      1
    );
    
    const jsonListData2 = {
      "twitter:Baoufa": "1",
    };
    
    const githubProviderData3 = await githubProvider.getRepositoriesContributors({
      repositories: [ "sismo-core/sismo-hub", "sismo-core/sismo-protocol" ],
    });
    
    const githubProviderData4 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "sismo-core/sismo-hub", "sismo-core/sismo-protocol" ],
    });
    
    const hiveProviderData5 = await hiveProvider.getInfluencersFromClusterWithMinimumFollowers({
      clusterName: "Ethereum"
    });
    
    const lensProviderData6 = await lensProvider.getFollowers({
      profileId: "sismo.lens"
    });
    
    const lensProviderData7 = await lensProvider.getWhoCollectedPublication({
      publicationId: "0x26e5-0x03"
    });
    
    const lensProviderData8 = await lensProvider.getWhoMirroredPublication({
      publicationId: "0x26e5-0x03"
    });
    
    const poapSubgraphProviderData9 = await poapSubgraphProvider.queryEventsTokenOwners({
      eventIds: [ "63400", "57318" ],
    });
    
    const restProviderData10 = await restProvider.getAccountsFromAPI({
      url: "https://www.mycustom.com/api"
    });
    
    const snapshotProviderData11 = await snapshotProvider.queryProposalVoters({
      proposal: "0x75819d24673193f3d61fe2760a833b9450df579a08d35f216a9e8a074fd2939a"
    });
    
    const snapshotProviderData12 = await snapshotProvider.querySpaceVoters({
      space: "sismo.eth"
    });
    
    const dataUnion = dataOperators.Union([ 
      proofOfHumanityData0,
      neoneoBadgeData1,
      jsonListData2,
      githubProviderData3,
      githubProviderData4,
      hiveProviderData5,
      lensProviderData6,
      lensProviderData7,
      lensProviderData8,
      poapSubgraphProviderData9,
      restProviderData10,
      snapshotProviderData11,
      snapshotProviderData12 
    ]);

    return [
      {
        name: "ben-badge-test",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
