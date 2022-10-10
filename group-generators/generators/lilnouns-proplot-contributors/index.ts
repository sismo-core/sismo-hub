import { dataProviders } from "@group-generators/helpers/data-providers";
import { ApiConfig } from '@group-generators/helpers/data-providers/rest-api';
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

type ApiDataType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  tldr: string;
  description: string;
  creatorId: string;
  votecount: number;
};

type FilteredDataType = {
  creatorId: string;
  votecount: number;
};

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const ApiConfig: ApiConfig = {
      url: "https://lil-noun-api.fly.dev/ideas",
      method: "GET",
      data: {},
    };

    const restProvider = new dataProviders.RESTProvider();

    const response = await restProvider.fetchData(ApiConfig);

    const filteredData = response.data
      .filter((data: ApiDataType) => data.votecount >= 50)
      .map(({ creatorId, votecount }: FilteredDataType) => ({
        creatorId,
        votecount,
      }));

    const eligibleContributors = filteredData.reduce(
      (acc: FilteredDataType, cur: FilteredDataType) => ({
        ...acc,
        [cur.creatorId]: cur.votecount,
      }),
      {}
    );

    return [
      {
        name: "lilnouns-proplot-contributors",
        timestamp: context.timestamp,
        data: eligibleContributors,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;