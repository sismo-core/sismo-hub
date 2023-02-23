// group-generators/generators/tutorial-ens-contributors/index.ts

import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  FetchedData,
  AccountSource
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Here you are hacker 😈

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily, // you generate the group only once
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const restProvider = new dataProviders.RestProvider();

    const response = await restProvider.fetchData({
      url: "https://mztsb3c3rk.execute-api.eu-west-3.amazonaws.com/dev/users",
      method: "get",
    });

    const dataProfiles: FetchedData = {};
    for (const item of response.data as any) {
      if (item.level === 1) {
        {
          dataProfiles[item.userId] = item.level.toString();
        }
      } else if (item.verified === true) {
        {
          dataProfiles[item.userId] = item.level.toString();
        }
      }
    }

    return [
      {
        name: "zohal-KYC",
        timestamp: context.timestamp,
        description: "Verify your e-mail address on Zohal's website",
        specs: "Get your e-mail address verified",
        data: dataProfiles,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;