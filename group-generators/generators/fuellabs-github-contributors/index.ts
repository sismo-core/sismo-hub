
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const githubProvider = new dataProviders.GithubProvider();
    
    const githubProviderData0 = await githubProvider.getRepositoriesContributors({
      repositories: [ "FuelLabs/sway", "FuelLabs/fuel-core", "FuelLabs/fuels-rs", "FuelLabs/fuels-ts", "FuelLabs/sway-applications", "FuelLabs/fuel-specs", "FuelLabs/fuelup", "FuelLabs/fuel-indexer", "FuelLabs/fuel-vm", "FuelLabs/fuels-wallet", "FuelLabs/sway-libs", "FuelLabs/sway-standards", "FuelLabs/sway-vscode-plugin", "FuelLabs/fuel-v2-contracts", "FuelLabs/fuel-explorer", "FuelLabs/fuel-explorer", "FuelLabs/fuels-portal", "FuelLabs/fuels-portal", "FuelLabs/sway-playground", "FuelLabs/sway-rfcs", "FuelLabs/swayswap", "FuelLabs/awesome-fuel", "FuelLabs/fuel-merkle" ]
    });

    return [
      {
        name: "fuellabs-github-contributors",
        timestamp: context.timestamp,
        description: "Data group of users that have contributed to a FuelLabs repository",
        specs: "Anyone that has contributed to a FuelLabs github repository.",
        data: githubProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
