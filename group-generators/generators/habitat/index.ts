
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const ethereumAttestationServiceProvider = new dataProviders.EthereumAttestationServiceProvider();
    
    const ethereumAttestationServiceProviderData0 = await ethereumAttestationServiceProvider.getAttestationValues({
      network: "sepolia",
      schema: "0x3bb54e554f4bba20b4c98584863a60985e4e021536311c3cf1798b6158015979",
      attester: "0x4E39DCdac1DCa1694897B5CB783Ab52683586962"
    });

    return [
      {
        name: "habitat",
        timestamp: context.timestamp,
        description: "Data group of Donation attesters from the Habitat app",
        specs: "Make a Donation attestation from the Habitat app",
        data: ethereumAttestationServiceProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
