import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Here you are hacker 😈

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once, // you generate the group only once
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    
    // 1. Instantiate your Github Provider
    const githubProvider = new dataProviders.GithubProvider();
    // Query all contributors of Uniswap pinned repositories
    const contributors = await githubProvider.getRepositoriesContributors({
      repositories: ["Uniswap/v3-core", 
      "Uniswap/v3-periphery",
      "Uniswap/interface",
      "Uniswap/v3-periphery",
      "Uniswap/v2-core",
      "Uniswap/v2-periphery"],
    });

    // 2. Make a union of the two queried data
    const uniswapContributors = dataOperators.Union([
      contributors
    ]);

    return [
      {
        name: "uniswap-contributors", // give a name to your group
        timestamp: context.timestamp,
        description: "Be an early contributor of Uniswap",
        specs: "You should have previously contributed on Uniswap/v3-core, Uniswap/v3-periphery, Uniswap/interface, Uniswap/v3-periphery, Uniswap/v2-core, or Uniswap/v2-periphery repositories.",
        // two different data formats in the group
        // ethereum account -> "0x95af97aBadA3b4ba443ff345437A5491eF332bC5": "1", 
        // github account ->   "github:mylogin": "1"
        // NB: Twitter accounts can also be added 
        // twitter account ->  "twitter:mylogin": "1"
        data: uniswapContributors, // we reference the final data we created
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;