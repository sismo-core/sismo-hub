
import { dataProviders } from "@group-generators/helpers/data-providers";
import { 
  Tags, 
  ValueType, 
  GroupWithData, 
  AccountSource,
  FetchedData
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once,
    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

      const restProvider = new dataProviders.RestProvider();
  
      const response = await restProvider.fetchData({
        url: "http://127.0.0.1:5002/api/sismoUsers",
        method: "get",
      });
  
         
      return [
        {
          name: "rhinofi-power-users",
          timestamp: context.timestamp,
          description: "Active users of Rhino.Fi app since May 2021",
          specs: "You must be a repeat user of Rhino.Fi after 21st May 2021 to be eligible for this badge.",
          data: response.data.users,
          accountSources: [AccountSource.ETHEREUM],
          valueType: ValueType.Score,
          tags: [Tags.User],
          
        },
      ];
    },
  };
  
  export default generator;
