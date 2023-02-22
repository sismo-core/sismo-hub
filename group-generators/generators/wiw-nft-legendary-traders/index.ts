import {dataProviders} from "@group-generators/helpers/data-providers";
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

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Daily,

    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        const wiwBadgeProvider = new dataProviders.WiwBadgeProvider();
        const addressGroup = await wiwBadgeProvider.queryBadgeHolders({
            tagId: "20033a13e1199dced2cb59ab150e5fef1857141acd6b012ac53fb60760379222"
        })

        return [
            {
                name: "wiw-nft-legendary-traders",
                timestamp: context.timestamp,
                description: "Realize ≥100 ETH profit from NFT tradings by 2022/11/30.",
                specs: "WIW Protocol calculates the realized profit from NFT tradings（ETH only）based on user’s ETH addresses. Those who own Legendary NFT traders tag（With realized profit ≥ 100 ETH) will be eligible for this badge.",
                data: addressGroup,
                valueType: ValueType.Score,
                accountSources: [AccountSource.ETHEREUM],
                tags: [Tags.Factory],
            },
        ];
    },
};

export default generator;