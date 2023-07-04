import { dataProviders } from "@group-generators/helpers/data-providers";
import { ApiConfig } from "@group-generators/helpers/data-providers/discourse";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const restProvider = new dataProviders.RestProvider();

    const addresses: FetchedData = {};

    let response;

    const maximumScore = 8;

    const delayStep = 200000;
    const delayDuration = 10000;

    const step = 25000;
    let offset = 0;

    const config: ApiConfig = {
      url: "https://api-gateway-dev.rociapi.com/ra/records",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.ROCI_API_KEY}`,
      },
      data: {
        filter: {
          global: {
            fields: [
              {
                name: "roci_credit_score",
                operator: "lte",
                value: maximumScore
              }
            ]
          }
        },
        limit: step,
        offset: offset,
      }
    };

    do {
      response = await restProvider.fetchData<any>(config);
      
      if(response.records.length !== 0) {
        response.records.forEach((addressData: any) => {
          addresses[addressData.address] = addressData.global.roci_credit_score;
        })
        offset += step ;
        config.data = {...config.data, offset};

        if (offset % delayStep === 0) {
          await new Promise(r => setTimeout(r, delayDuration));
        }
      }

    } while (response.records.length !== 0)

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
