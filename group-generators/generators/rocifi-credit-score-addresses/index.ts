import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const restProvider = new dataProviders.RestProvider();

    const addresses: FetchedData = {};
    
    const step = 1000;
    let offset = 0;
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
          "limit": ${step},
          "offset": ${offset},
        }`),
      })
      response.forEach((address: any) => {
        addresses[address.address] = address.roci_credit_score;
      })
      offset += step ;
      // console addresses length
      console.log(Object.keys(addresses).length);
    } while (response.ethereumAddresses.length === 0)

    return [
      {
        name: "rocifi-credit-score-addresses",
        timestamp: context.timestamp,
        description: "Rocifi credit score addresses",
        specs: "This Group consist of All addresses scored by RociFi",
        data: addresses,
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
