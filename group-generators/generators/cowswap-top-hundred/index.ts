import fs from 'fs';
import path from 'path';

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

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    
    const addressList = fs.readFileSync(path.resolve(__dirname, "cow_top_100.csv"))
            .toString()
            .split("\n");
        const addressGroup: { [key: string]: string} = {};
        for (const address of addressList) {
            addressGroup[address] = "1";
        }

    return [
      {
        name: "cowswap-top-hundred", 
        timestamp: context.timestamp,
        description: "According to aggregate 2022 volumes, you're a top 100 CoW trader",
        specs: "According to aggregate 2022 volumes, you've traded more than $21,328,944",
        data: addressGroup,
        valueType: ValueType.Score,
        accountSources: [AccountSource.ETHEREUM],
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;