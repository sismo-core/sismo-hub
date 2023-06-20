
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
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x0b7b4c639548144a881acddf9acb2cd435213b86d90e73fe670a821dd25ba5ee": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x23e8f35456efbe487c3d9fd86a5ed92ffb3aed22f7b8950bc54fde9fcf234f09": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x23841a5ef4aca049e2ab316e5b631eea051f3874a0cbd93a5a0c5c2f787a98eb": "1",
    };

    return [
      {
        name: "privacy-is-normal-lottery-winners-test",
        timestamp: context.timestamp,
        description: "Data Group of winners from the 'Privacy Is Normal' Lottery.",
        specs: "Data Group of winning participants from the 'Privacy Is Normal' Lottery (deposited or withdrew 0.1 or 1 or 10 or 100 ETH on Tornado Cash on Ethereum mainnet to participate).",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
