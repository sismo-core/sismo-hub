import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const restProvider = new dataProviders.RestProvider();

    const factoryUsersAddresses = await restProvider.fetchData<{ ethereumAddresses: string[] }>({
      url: "https://factory-api.sismo.io/users/ethereum-addresses"
    })

    const factoryUsers: FetchedData = {};
    for (const address of factoryUsersAddresses.ethereumAddresses) {
      factoryUsers[address] = 1;
    }

    return [
      {
        name: "sismo-factory-users",
        timestamp: context.timestamp,
        description: "Users of Sismo Factory",
        specs: "You need to be a user of the Sismo Factory to be part of this group",
        data: factoryUsers,
        valueType: ValueType.Score,
        tags: [Tags.User, Tags.Maintained],
      },
    ];
  },
};

export default generator;
