import { BigNumber, ethers } from "ethers";
import { BigQueryProvider } from "@group-generators/helpers/data-providers/big-query";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";
import { ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const bigQueryProvider = new BigQueryProvider();

    const aaveDelegates: FetchedData = {};
    const delegations : DelegationsEntry = {};
    
    type AddressDelegationsEntry = {
      blockNumber: number;
      // votingPower: string;
      delegatee: string;
    }
    
    type DelegationsEntry = {
      [address: string]: AddressDelegationsEntry[];
    }
  

    const aavechanAddress = "0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4"
    const aaveTokenContract = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
    // const stkAaveTokenContract = "0x4da27a545c0c5B758a6BA100e3a049001de870f5";

    // ######################
    // # GET AAVE DELEGATES #
    // ######################

    // classic delegate event
    const delegateEventABI = "event DelegateChanged(address indexed delegator, address indexed delegatee, uint8 delegationType)"
    type delegateEventArgs = {
      delegator: string;
      delegatee: string;
      delegationType: any;
    };

    console.log(">>> get events");

    const delegateTransactions: any =
    await bigQueryProvider.getEvents<delegateEventArgs>(
      {
        eventABI: delegateEventABI,
        contractAddress: aaveTokenContract,
      }
    );

    const jsonRPCProvider = new JsonRpcProvider(process.env.JSON_RPC_URL);

    const getPowerAtBlockABI =[
      "function getPowerAtBlock(address user, uint256 blockNumber, uint8 delegationType) external virtual view returns (uint256)"
    ];

    const aaveContract = new ethers.Contract(
        aaveTokenContract,
        getPowerAtBlockABI,
        jsonRPCProvider
    );

    console.log(">>> event sorting");

    for (const transaction of delegateTransactions) {
      delegations[transaction.delegator] = delegations[transaction.delegator] 
      ? [...delegations[transaction.delegator], {"blockNumber": transaction.block_number, "delegatee": transaction.delegatee}]
      : [{"blockNumber": transaction.block_number, "delegatee": transaction.delegatee}];


      // if(transaction.delegatee === aavechanAddress) {
      //   console.log("transaction", transaction);
      //   const power = await aaveContract.getPowerAtBlock(transaction.delegator, transaction.block_number-1, transaction.delegationType);
      //   aaveDelegates[transaction.delegator] = BigNumber.from(power).toString();
      //   console.log("power", power);
      // }
    }

    console.log("detection right events");

    let totalPowerDelegate = 0;

    const decimals = BigNumber.from(10).pow(18);

    for(const [address, info] of Object.entries(delegations)) {
      if(info[info.length-1].delegatee === aavechanAddress) {
        const power = await aaveContract.getPowerAtBlock(address, info[info.length-1].blockNumber-1, 0);
        aaveDelegates[address] = BigNumber.from(power).div(decimals).toString();
        console.log("address", address);
        console.log("value", BigNumber.from(power).toString());
        console.log("value", BigNumber.from(power).div(decimals).toString());
        totalPowerDelegate += BigNumber.from(power).div(decimals).toNumber();
      }
    }

    console.log(">>> totalPowerDelegate", totalPowerDelegate);

    console.log("finished!");

    // ----------------------------------------------------------------------------------------------------------------


    // for (const transaction of delegateTransactions) {
    //   if(transaction.delegatee === aavechanAddress) {
    //     console.log("transaction", transaction);
    //     const power = await aaveContract.getPowerAtBlock(transaction.delegator, transaction.block_number-1, transaction.delegationType);
    //     console.log("power", power);
    //     aaveDelegates[transaction.delegator] = BigNumber.from(power).toString();
    //   }
    // }

    // 38d996c36267401219b7456d560cabfb93668bf5103054c2c73ecf65543dc075

    // delegated power changed event
    // const delegatedPowerChangedEventABI = "event DelegatedPowerChanged(address indexed user, uint256 amount, uint8 delegationType)";
    // type DelegatedPowerChangedEventArgs = {
    //   user: string;
    //   amount: BigNumberish;
    //   delegationType: number;
    // };

    // const delegateChangedTransactions =
    // await bigQueryProvider.getEvents<DelegatedPowerChangedEventArgs>(
    //   {
    //     eventABI: delegatedPowerChangedEventABI,
    //     contractAddress: aaveTokenContract,
    //   }
    // );

    // console.log(delegateChangedTransactions);

    // let count = 0;

    // for (const transaction of delegateChangedTransactions) {
    //   if(transaction.user === aavechanAddress) {
    //     // aaveDelegates[transaction.delegator] = 1;
    //     console.log("transaction.amount", transaction.amount.toString());
    //     count ++;
    //   }
    // }

    // console.log("count", count);

    // cd8e103f89eed10dbe2bb3e6d433ccce431bafbe646809230cd6c79eb9ebd2be

    return [
      {
        name: "aavechan-aave-delegates",
        timestamp: context.timestamp,
        description:
          "Aave-chan Aave and stkAave delegates",
        specs:
          "Group consist of all Aave-chan Aave and stkAave delegates",
        data: aaveDelegates,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
