
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
  
    const restProvider = new dataProviders.RestProvider();
    
    const restProviderData0 = await restProvider.getAccountsFromAPI({
      url: "https://crypto-bureau.fly.dev/data/eth-global-tx-senders"
    });

    return [
      {
        name: "ethglobal-stakers",
        timestamp: context.timestamp,
        description: "ETH Global stakers before 1 May",
        specs: "Be a ETH Global in-person Hackathon staker (0.05 ETH) in the period of 1 March – 1 May 2023.",
        data: restProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
