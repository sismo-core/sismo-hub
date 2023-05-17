
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["tornado-cash-eth-depositors-ethereum-mainnet",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const tornadoCashEthDepositorsEthereumMainnetGroupLatest = await groupStore.latest(
      "tornado-cash-eth-depositors-ethereum-mainnet"
    );
    
    const tornadoCashEthDepositorsEthereumMainnetData0 = dataOperators.Map(
      await tornadoCashEthDepositorsEthereumMainnetGroupLatest.data(),
      1
    );
    
    const jsonListData1 = {
      "0x938f169352008d35e065F153be53b3D3C07Bcd90": "1",
      "0x004c350cd1ab72ea28cd6c47935b5bb31f64a928": "1",
      "0x35Af38bAC1793642D2fd3d71807aA54A56ed8183": "1",
    };
    
    const dataUnion = dataOperators.Union([
      tornadoCashEthDepositorsEthereumMainnetData0,
      jsonListData1 
    ]);

    return [
      {
        name: "tornado-test-wei-ben",
        timestamp: context.timestamp,
        description: "Test for wei value with tornado cash group",
        specs: "Have a dev address from Ben or be a Tornado cash depositor on mainent",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
