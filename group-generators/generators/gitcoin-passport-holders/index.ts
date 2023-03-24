import { dataProviders } from "@group-generators/helpers/data-providers";
import { ApiConfig } from "@group-generators/helpers/data-providers/rest-api";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const restProvider = new dataProviders.RestProvider();

    const gitcoinGrantsDonors: FetchedData = {};
    let res: any;
    const url = "https://api.scorer.gitcoin.co";

    const apiConfig: ApiConfig = {
      url: url + "/analytics/score/13?limit=1000",
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.GITCOIN_API_KEY}`,
        accept: "application/json",
      },
    };

    res = await restProvider.fetchData(apiConfig);

    res.items.forEach((user: any) => {
      gitcoinGrantsDonors[user.address] = 1;
    });

    apiConfig.url = url + res.next;

    do {
      res = await restProvider.fetchData(apiConfig);

      res.items.forEach((user: any) => {
        gitcoinGrantsDonors[user.address] = 1;
      });

      apiConfig.url = url + res.next;
    } while (res.next);

    return [
      {
        name: "gitcoin-passport-holders",
        timestamp: context.timestamp,
        description: "Prove that you own a Gitcoin Passport",
        specs: "You must have a Gitcoin Passport",
        data: gitcoinGrantsDonors,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
