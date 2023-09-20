// group-generators/generators/tutorial-first-sismo-post-collectors/index.ts

import {dataProviders} from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  GroupWithData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const duneProvider = new dataProviders.DuneProvider();

    const duneProviderDataEthHolders = await duneProvider.executeQuery({
      queryId: 2921850,
      queryParamsObject: {
        "gte_value": "10e18",
      },
      duneEthAddressColumn: "address"
    });

    return [
      {
        // give a name to your Group
        name: "ethereum-holders-having-more-than-ten-eth",
        timestamp: context.timestamp,
        // add a small description explaining how to be eligible to your Group
        description: "Addresses holding more than 10 ethers on the Ethereum network.",
        // document the Group eligibility criterias more specifically
        specs: "This group consists of all the addresses holding more than 10 ethers on the Ethereum network.",
        data: duneProviderDataEthHolders,
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Mainnet],
      },
    ];
  },
};

export default generator;