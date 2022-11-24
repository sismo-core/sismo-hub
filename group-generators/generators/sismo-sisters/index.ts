
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
  dependsOn: ["proof-of-attendance-main-events","ethereum-power-users",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const proofOfAttendanceMainEventsGroupLatest = await groupStore.latest(
      "proof-of-attendance-main-events"
    );
    
    const proofOfAttendanceMainEventsData0 = dataOperators.Map(
      await proofOfAttendanceMainEventsGroupLatest.data(),
      1
    );
    
    const githubProviderData1 = await githubProvider.getRepositoriesStargazers({
      repositories: [ "sismo-core/sismo-protocol" ],
    });
    
    const ethereumPowerUsersGroupLatest = await groupStore.latest(
      "ethereum-power-users"
    );
    
    const ethereumPowerUsersData2 = dataOperators.Map(
      await ethereumPowerUsersGroupLatest.data(),
      1
    );
    
    const jsonListData3 = {
      "0xb01ee322C4f028B8A6BFcD2a5d48107dc5bC99EC": "1",
      "0xFd247FF5380d7DA60E9018d1D29d529664839Af2": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      proofOfAttendanceMainEventsData0,
      githubProviderData1,
      ethereumPowerUsersData2,
      jsonListData3 
    ]);

    return [
      {
        name: "sismo-sisters",
        timestamp: context.timestamp,
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
