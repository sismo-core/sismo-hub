
import axios from "axios";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    let data = {};

    try {
      const { data: responseData } = await axios({
        url: "https://af7x4g47jecs3kea.anvil.app/7O2MJQF4V4A3Q5CKLTOZ5GKD/_/api/users/",
        method: "get",
      });
      data = responseData.reduce((obj: any, item: any) => {
        obj[item] = 1;
        return obj;
      }, {});
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch data...");
    }

    return [
      {
        name: "anvil-demo",
        timestamp: context.timestamp,
        description: "Registered Users of the Anvil Demo App",
        specs: "Listed as a user of the anvil.works app created to test/demo the use of sismo and anvil together.",
        data: data,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
