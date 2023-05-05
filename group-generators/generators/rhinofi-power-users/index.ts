import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  AccountSource
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

type UserEntry = {
  ethAddress: string;
  active_weeks: number;
};

export async function formatUsers(context: GenerationContext, data: Array<UserEntry>): Promise<GroupWithData[]> {
  const users: { [key: string]: number } = {};
    for (const element of data) {
      users[element.ethAddress] = 1;
  }

  return [
    {
      name: "rhinofi-power-users",
      timestamp: context.timestamp,
      description: "Active users of Rhino.Fi app since May 2021",
      specs: "You must be a repeat user of Rhino.Fi after 21st May 2021 to be eligible for this badge.",
      data: users,
      accountSources: [AccountSource.ETHEREUM],
      valueType: ValueType.Score,
      tags: [Tags.User],
    },
  ];
}

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Daily,
    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
      const restProvider = new dataProviders.RestProvider();

      const response = await restProvider.fetchData({
        url: "https://rhino.metabaseapp.com/public/question/4c4ebd3e-54a8-40e6-bb4f-a572187d4499.json",
        method: "get",
      }) as unknown as Array<UserEntry>;

      return formatUsers(context, response);
    },
  };

  export default generator;
