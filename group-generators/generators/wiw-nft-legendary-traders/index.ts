import {
    Tags,
    ValueType,
    GroupWithData,
    AccountSource,
} from "topics/group";
import {
    GenerationContext,
    GenerationFrequency,
    GroupGenerator,
} from "topics/group-generator";
import {dataProviders} from "@group-generators/helpers/data-providers";

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once,

    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        const wiwBadgeProvider = new dataProviders.WiwBadgeProvider();
        const addressGroup = await wiwBadgeProvider.queryBadgeHolders({
            tagId: "20033a13e1199dced2cb59ab150e5fef1857141acd6b012ac53fb60760379222"
        })

        return [
            {
                name: "wiw-nft-legendary-traders",
                timestamp: context.timestamp,
                data: addressGroup,
                valueType: ValueType.Score,
                accountSources: [AccountSource.ETHEREUM],
                tags: [Tags.Factory],
            },
        ];
    },
};

export default generator;