import { dataProviders } from '@group-generators/helpers/data-providers';
import { Tags, ValueType, GroupWithData } from 'topics/group';
import {
    GenerationContext,
    GenerationFrequency,
    GroupGenerator,
} from 'topics/group-generator';

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once,
    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
        const restProvider = new dataProviders.RestProvider();
        const validators = await restProvider.getAccountsFromAPI({
            url: 'http://freerangedao.xyz/api/allowlist',
            method: 'GET',
        });

        return [
            {
                name: 'free-range-validators',
                specs: 'Validators on our allowlist',
                description:
                    'Validators eligible to take the Free Range Survey',
                timestamp: context.timestamp,
                data: validators,
                valueType: ValueType.Score,
                tags: [Tags.User],
            },
        ];
    },
};

export default generator;
