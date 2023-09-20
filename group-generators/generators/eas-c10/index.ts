
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
    
    const ethereumAttestationServiceProviderData0 = await ethereumAttestationServiceProvider.getAttestationValues({
      network: "sepolia",
      schema: "0x1a4ed8485249d0bd41d9e796f6f0db290f3ab04106a6bb27452eecad696bc41f",
      attester: "0xAE5F7F1703660802edC0Cd66A5745b8eB88aad87"
    });

    return [
      {
        name: "eas-c10",
        timestamp: context.timestamp,
        description: "EAS C10",
        specs: "Every users that have buy C10INDEX, receive an attestation from EAS.",
        data: ethereumAttestationServiceProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
