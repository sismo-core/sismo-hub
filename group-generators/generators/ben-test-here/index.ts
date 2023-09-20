
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
  
    const gitPoapProvider = new dataProviders.GitPoapProvider();
    
    const jsonListData0 = {
      "ben.eth": "1",
    };
    
    const gitPoapProviderData1 = await gitPoapProvider.getGitPoapHoldersByEventId({
      gitPoapEventId: "831"
    });
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      gitPoapProviderData1 
    ]);

    return [
      {
        name: "ben-test-here",
        timestamp: context.timestamp,
        description: "test",
        specs: "test",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
