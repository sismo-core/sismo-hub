// import { dataProviders } from '@group-generators/helpers/data-providers';
import { Tags, ValueType, GroupWithData } from 'topics/group';
import {
    GenerationContext,
    GenerationFrequency,
    GroupGenerator,
} from 'topics/group-generator';

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once,
    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        // const restProvider = new dataProviders.RestProvider();
        // const validators = await restProvider.getAccountsFromAPI({
        //     url: 'http://freerangedao.xyz/api/allowlist',
        //     method: 'GET',
        // });

        return [
            {
                name: 'free-range-validators',
                specs: 'Validators on our allowlist',
                description:
                    'Validators eligible to take the Free Range Survey',
                timestamp: context.timestamp,
                data: {
                    '0xc4EE7d84038A3f09237AfF8B59da65D1F22351ff': 32000000000,
                    '0x28EDE9352a5f76Daec81cfC65d7246f6665f5fA3': 32000000000,
                    'leo21.sismo.eth': 32000000000,
                    '0x23314160c752D6Bb544661DcE13d01C21c64331E': 32000000000,
                },
                valueType: ValueType.Score,
                tags: [Tags.User],
            },
        ];
    },
};

export default generator;
