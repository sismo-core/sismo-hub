
import { ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const jsonListData0 = {
      "demo.eth": "1",
    };

    return [
      {
        name: "privacy-is-normal-lottery-winners-demo",
        timestamp: context.timestamp,
        description: "Data Group of a fake winner from 'Privacy Is Normal' Lottery for Demo purpose.",
        specs: "Data Group of fake winning participant from the 'Privacy Is Normal' Lottery (deposited or withdrew 0.1 or 1 or 10 or 100 ETH on Tornado Cash on Ethereum mainnet to participate).",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
