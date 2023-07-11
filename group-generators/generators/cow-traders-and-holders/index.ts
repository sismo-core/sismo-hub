import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
import { ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["cow-holders","cow-traders"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    const cowHoldersGroupLatest = await groupStore.latest(
      "cow-holders"
    );

    const cowTradersGroupLatest = await groupStore.latest(
      "cow-traders"
    );
    
    const dataUnion = dataOperators.Union([ 
      await cowHoldersGroupLatest.data(),
      await cowTradersGroupLatest.data(),
    ], UnionOption.Max);

    return [
      {
        name: "cow-traders-and-holders",
        timestamp: context.timestamp,
        description: "Data group of COW Token Holders & COW Swap Traders",
        specs: "Networks: Ethereum mainnet, Gnosis chain. Token Holders, Snapshot date on 2023-07-01. Tokens: COW, vCOW. Value 1 Top 50% of holders - Value 2 Top 30% of holders - Value 3 Top 15% of holders. Swap Traders, Time period: 2023-01-01 - 2023-07-01. Value 1 Traded on CoW Swap 2 times or more - Value 2 Traded on CoW Swap 6 times or more - Value 3 Traded on CoW Swap 37 times or more.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
