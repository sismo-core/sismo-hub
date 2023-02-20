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

type Round = string[][];

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const groups: GroupWithData[] = [];
    const roundNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const restProvider = new dataProviders.RestProvider();

    const fetchRoundsData = await restProvider.fetchData({
      url: "https://static.sismo.io/data/gitcoin-donors-rounds-1-to-15.json",
      method: "get",
    });

    const rounds: Round[] = Object.values(fetchRoundsData).map(
      (value) => value
    )[0];

    for (const number of roundNumber) {
      const data: FetchedData = {};
      const gitcoinApiAddresses = rounds[number - 1];

      const dataApi = gitcoinApiAddresses.map((address: string[]) => {
        return address[0];
      });

      for (const address of dataApi) {
        data[address] = 1;
      }

      groups.push({
        name: `gitcoin-grants-round-${number}-api-donors`,
        timestamp: context.timestamp,
        description: `Gitcoin Grants round ${number} API donors`,
        specs: `Gitcoin Grants round ${number} API donors`,
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.GitcoinGrant],
      });
    }

    return groups;
  },
};

export default generator;
