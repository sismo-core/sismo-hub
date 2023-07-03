
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
      network: "optimism-goerli",
      schema: "0xd7ca28ca34ee0a6c54b9f0581fa629dff9d1329d55f6e1d7bc5e620fcc4e6dd1",
      attester: "0xbbbA5962003e4Cbba5F730fd20ABe03fe6cc2635"
    });

    return [
      {
        name: "hearth-health-participants",
        timestamp: context.timestamp,
        description: "Data group of participants in the heart health study",
        specs: "Was attested to by an authorized individual to participate in heart health study and biometrics were recorded.",
        data: ethereumAttestationServiceProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
