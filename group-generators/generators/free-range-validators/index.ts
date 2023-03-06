// import { dataProviders } from '@group-generators/helpers/data-providers';
import { dataOperators } from '@group-generators/helpers/data-operators';
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

        const testAddresses = {
            '0xc4EE7d84038A3f09237AfF8B59da65D1F22351ff': 32000000000,
            '0x28EDE9352a5f76Daec81cfC65d7246f6665f5fA3': 32000000000,
            'leo21.sismo.eth': 32000000000,
            '0x23314160c752D6Bb544661DcE13d01C21c64331E': 32000000000,
            '0xFbf772A578a31288A28FFB74c79987Cd6A7985d': 1,
            '0x9c69e7FCe961FD837F99c808aD75ED39a2c549Cb': 1,
            '0x1C04b43a1c9d46775Ab242EEAeABaDB7215281D2': 1,
            '0xf8049C8425f9eAb4E2AE9E1D950f9D3F71481882': 1,
        };

        // Map to have only 1 as value
        const data = dataOperators.Map(testAddresses, 1);

        return [
            {
                name: 'free-range-validators',
                specs: 'Validators on our allowlist',
                description:
                    'Validators eligible to take the Free Range Survey',
                timestamp: context.timestamp,
                data,
                valueType: ValueType.Score,
                tags: [Tags.User],
            },
        ];
    },
};

export default generator;
