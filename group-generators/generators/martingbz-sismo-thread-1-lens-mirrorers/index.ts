import { dataProviders } from "@group-generators/helpers/providers";
import { ValueType, Tags, FetchedData, GroupWithData } from "topics/group";
import {
    GenerationContext,
    GenerationFrequency,
    GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Weekly,

    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        const lensProvider = new dataProviders.LensProvider();

        const dataProfiles: FetchedData = {};
        for await (const item of lensProvider.getWhoMirroredPublication("0x10a6-0x0b")) {
            dataProfiles[item.ownedBy] = 1;
        }

        return [
            {
                name: "martingbz-sismo-thread-1-lens-mirrorers",
                timestamp: context.timestamp,
                data: dataProfiles,
                valueType: ValueType.Info,
                tags: [Tags.User, Tags.Lens, Tags.Web3Social],
            },
        ];
    },
};

export default generator;
