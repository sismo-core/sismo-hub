import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const lensProvider = new dataProviders.LensProvider();

    const dataProfiles: FetchedData = await lensProvider.getWhoMirroredPublication({
      publicationId: "0x10a6-0x0b",
    });

    return [
      {
        name: "martingbz-sismo-thread-1-lens-mirrorers",
        timestamp: context.timestamp,
        description: "Be a Lens Mirrorer of martingbz's Sismo thread",
        specs: "",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User, Tags.Lens, Tags.Web3Social],
      },
    ];
  },
};

export default generator;
