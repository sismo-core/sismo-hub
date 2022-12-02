import fs from 'fs';
import path from 'path';
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
    generationFrequency: GenerationFrequency.Once,

    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        const addressList = fs.readFileSync(path.resolve(__dirname, 'address_snapshot_20221202.csv'))
            .toString()
            .split("\n");
        const addressGroup: { [key: string]: string} = {};
        for (const address of addressList) {
            addressGroup[address] = "1";
        }

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