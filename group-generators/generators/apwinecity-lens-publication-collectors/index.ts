import { dataProviders } from "@group-generators/helpers/providers";
import {
    ValueType,
    Tags,
    FetchedData,
    GroupWithData,
    GroupStore,
} from "topics/group";
import {
    GenerationContext,
    GenerationFrequency,
    GroupGenerator,
} from "topics/group-generator";

// This group is constituted by all addresses that collected APWine City publication ont Lens
// the value is 1
const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Daily,

    generate: async (
        context: GenerationContext,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        groupStore: GroupStore
    ): Promise<GroupWithData[]> => {
        const lensProvider = new dataProviders.LensProvider();

        // APWine City publicationId: 0xad1e-0x02
        const dataProfiles: FetchedData = {};
        for await (const item of lensProvider.getWhoCollectedPublication("0xad1e-0x02")) {
            dataProfiles[item.address] = 1;
        }

        return [
            {
                name: "apwinecity-lens-publication-collectors",
                timestamp: context.timestamp,
                data: dataProfiles,
                valueType: ValueType.Info,
                tags: [Tags.User, Tags.Lens, Tags.Web3Social],
            },
        ];
    },
};

export default generator;
