// sismo-hub/group-generators/generators/wiw-nft-degen-traders/index.ts

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

// Here you are hacker 😈

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once,

    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        const addressList = fs.readFileSync(path.resolve(__dirname, 'address_snapshot_20221124.csv'))
            .toString()
            .split("\n");
        const addressGroup: { [key: string]: string} = {};
        for (const address of addressList) {
            addressGroup[address] = "1";
        }

        return [
            {
                name: "wiw-nft-degen-traders",
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