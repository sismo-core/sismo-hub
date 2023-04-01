import {ethers} from "ethers";
import {JsonRpcProvider} from "@group-generators/helpers/data-providers/json-rpc";
import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";


const GOERLI_RPC = "https://goerli.blockpi.network/v1/rpc/public"; // Used a public RPC

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly, // or Daily?

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const jsonRPCProvider = new JsonRpcProvider(GOERLI_RPC);

    // Zykloon contract address
    const zykloonContractAddress = "0xe1581476e0a926C0fFC4e2E754C0bB82201378d7";
    const zykloonABI =[
        "event Deposit(address indexed user)"
    ];

    const ZykloonContract = new ethers.Contract(
        zykloonContractAddress,
        zykloonABI,
        jsonRPCProvider
    );

    const latest_block = await jsonRPCProvider.getBlockNumber()

    const depositEvents = await ZykloonContract.queryFilter(
        ZykloonContract.filters.Deposit(),
        latest_block - 1023, // 1 week in blocks, given 13.5s block time. Too many blocks tho. Hard coding this to 1023 for now.
        latest_block 
    );

    const zykloonDepositors: FetchedData = {};

    for (const event of depositEvents) {
      if(event.args){
        zykloonDepositors[event.args[0]] = 1;
      }
    }

    return [
      {
        // give a name to your group
        name: "zykloon_epoch_depositors",
        timestamp: context.timestamp,
        // add a small description explaining how to be eligible to your group
        description: "Deposit funds in zykloon contract within the specified epoch",
        // document the group eligibility criterias more specifically
        specs: "Deposit Ether in zykloon contract within the specified epoch",
        data: zykloonDepositors,
        valueType: ValueType.Info, // ValueType.Score if we need to increment
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;