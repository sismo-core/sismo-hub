import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const restProvider = new dataProviders.RestProvider();

    const addresses: FetchedData = {};
    
    let response;
    do {
      response = await restProvider.fetchData<any>({
        url: "https://api-gateway-dev.rociapi.com/ra/records",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.parse(`{
          "filter": {
            "global": {
              "fields": [
                {
                  "name": "roci_credit_score",
                  "operator": "lte",
                  "value": 10
                }
              ]
            }
          },
          "limit": 1000,
          "offset": 0
        }`),
      })
      response.forEach((address: any) => {
        addresses[address.address] = address.roci_credit_score;
      })
    } while (response.ethereumAddresses.length === 0)

    return [
      {
        name: "sismo-factory-users",
        timestamp: context.timestamp,
        description: "Users of Sismo Factory",
        specs: "You need to be a user of the Sismo Factory to be part of this group",
        data: addresses,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
