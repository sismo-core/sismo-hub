
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
  
    const ethereumAttestationServiceProvider = new dataProviders.EthereumAttestationServiceProvider();
    
    const ethereumAttestationServiceProviderData0 = await ethereumAttestationServiceProvider.getAttestationRecipients({
      network: "sepolia",
      schema: "0xa35152ced9325162acadd95566fa5a71cc8cf86911b1ae2287da05e033c93881",
      attester: "0x717654f0E07450e47A53e6A33eE191852C47CaF8"
    });

    return [
      {
        name: "aestestsismo",
        timestamp: context.timestamp,
        description: "AESTestSismo",
        specs: "AESTestSismo",
        data: ethereumAttestationServiceProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
