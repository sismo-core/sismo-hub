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
    
    const addressList = fs.readFileSync(path.resolve(__dirname, "cow_rest.csv"))
            .toString()
            .split("\n");
        const addressGroup: { [key: string]: string} = {};
        for (const address of addressList) {
            addressGroup[address] = "1";
        }

    return [
      {
        name: "cowswap-rest", 
        timestamp: context.timestamp,
        description: "Anyone that have traded on CoW Swap in 2022",
        specs: "Anyone that have traded on CoW Swap in 2022",
        data: addressGroup,
        valueType: ValueType.Score,
        accountSources: [AccountSource.ETHEREUM],
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;