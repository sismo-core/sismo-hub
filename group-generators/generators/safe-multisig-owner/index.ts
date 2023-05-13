
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
  
    const safeProvider = new dataProviders.SafeProvider();
    
    const safeProviderData0 = await safeProvider.getSafeOwners({
      safeAddress: "0xB93f4b02bBF10b73d1BC35A88E3A2eD5aEaD47d5"
    });

    return [
      {
        name: "safe-multisig-owner",
        timestamp: context.timestamp,
        description: "Data group of multisig owner ",
        specs: "Is owner of a mainnet safe multisig ",
        data: safeProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
