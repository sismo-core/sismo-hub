import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  //Galxe passport is on BSC contract: https://bscscan.com/token/0xe84050261cb0a35982ea0f6f3d9dff4b8ed3c012
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const ankrProvider = new dataProviders.AnkrProvider();
    const addresses = await ankrProvider.getNftHolders({
      network: "bsc",
      address: "0xE84050261CB0A35982Ea0f6F3D9DFF4b8ED3C012",
    });
    return [
      {
        name: "example-galxe-passport-holders",
        description: "Get all Galxe passport holders",
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
