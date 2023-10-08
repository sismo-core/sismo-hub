
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
      safeAddress: "0xAa17006f6cCe0b365dB6Ea43D55708A297cd0685"
    });

    return [
      {
        name: "just-testing-safe",
        timestamp: context.timestamp,
        description: "Data group of Safe testers",
        specs: "Data group of Safe testers, only 1 for each value",
        data: safeProviderData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
