
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
  
    const duneProvider = new dataProviders.DuneProvider();
    
    const duneProviderData0 = await duneProvider.executeQuery({
      queryId: 2329829,
      duneEthAddressColumn: "owner"
    });

    return [
      {
        name: "paid-ccprofile-owner",
        timestamp: context.timestamp,
        description: "Own a paid ccProfile (less than 12 characters)",
        specs: "Hold a ccProfile that has less than 12 characters (i.e. is paid for by the user). You can mint your ccProfile today at https://cc.me/mint. This list is updated daily.",
        data: duneProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
