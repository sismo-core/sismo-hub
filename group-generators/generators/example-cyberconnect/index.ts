import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  //CyberConnect holders are on BSC contract: https://bscscan.com/token/0x2723522702093601e6360cae665518c4f63e9da6
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const ankrProvider = new dataProviders.AnkrProvider();
    const addresses = await ankrProvider.getNftHolders({
      network: "bsc",
      address: "0x2723522702093601e6360CAe665518C4f63e9dA6",
    });
    return [
      {
        name: "example-cyberconnect",
        description: "Get all CyberConnect holders",
        specs: "",
        timestamp: context.timestamp,
        data: addresses,
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
