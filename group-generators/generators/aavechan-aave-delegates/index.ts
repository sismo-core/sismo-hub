import { BigNumber, ethers } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
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
    const stkAaveDelegates: FetchedData = {};

    const delegations : DelegationsEntry = {};
    const stkAaveDelegations : DelegationsEntry = {};
    
    type AddressDelegationsEntry = {
      blockNumber: number;
      delegatee: string;
      delegationType: number;
    }
    
    type DelegationsEntry = {
      [address: string]: AddressDelegationsEntry[];
    }
  
    const aavechanAddress = "0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4"
    const aaveTokenContract = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
    const stkAaveTokenContract = "0x4da27a545c0c5B758a6BA100e3a049001de870f5";

    // ######################
    // # GET Aave DELEGATES #
    // ######################

    // classic delegate event
    const delegateEventABI = "event DelegateChanged(address indexed delegator, address indexed delegatee, uint8 delegationType)"
    type delegateEventArgs = {
      delegator: string;
      delegatee: string;
      delegationType: any;
    };

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

    for (const transaction of delegateTransactions) {
      delegations[transaction.delegator] = delegations[transaction.delegator] 
      ? [...delegations[transaction.delegator], {"blockNumber": transaction.block_number, "delegatee": transaction.delegatee, "delegationType": transaction.delegationType}]
      : [{"blockNumber": transaction.block_number, "delegatee": transaction.delegatee, "delegationType": transaction.delegationType}];
    }

    let totalPowerDelegate = 0;

    const decimals = BigNumber.from(10).pow(18);

    for(const [address, info] of Object.entries(delegations)) {

      const lastDelegations: any = {};

      info.forEach(info => {
        const type = info.delegationType;
        if (!lastDelegations[type] || info.blockNumber > lastDelegations[type].blockNumber) {
          lastDelegations[type] = info;
        }
      });

      // if the address has delegated is voting power or is proposition power to aaavechan
      if(lastDelegations[0]?.delegatee === aavechanAddress || lastDelegations[1]?.delegatee === aavechanAddress) {
        let lastDelegation;
        // in the case where an address have a voting power and a proposition power different from each other
        // e.g. someone has delegated his voting power to aavechan and aavechan has delegated his proposition power to someone else
        // if the address has delegated both his voting power and his proposition power
        let power;
        if(lastDelegations[0] && lastDelegations[1]) {
          // get the power at the block before the delegation
          const powerType0 = await aaveContract.getPowerAtBlock(address, lastDelegations[0].blockNumber-1, 0);
          const powerType1 = await aaveContract.getPowerAtBlock(address, lastDelegations[1].blockNumber-1, 1);
          // take the max power
          if(BigNumber.from(powerType0).gte(BigNumber.from(powerType1))) {
            lastDelegation = lastDelegations[0];
            power = powerType0;
          }
          else {
            lastDelegation = lastDelegations[1];
            power = powerType1;
          }
        }
        // if the address has delegated only his voting power or only his proposition power
        else {
          lastDelegation = lastDelegations[0] ? lastDelegations[0] : lastDelegations[1];
          // get the power at the block before the delegation
          power = await aaveContract.getPowerAtBlock(address, lastDelegation.blockNumber-1, 1);
        }

        aaveDelegates[address] = BigNumber.from(power).div(decimals).toString();
        totalPowerDelegate += BigNumber.from(power).div(decimals).toNumber();
      }
    }

    console.log(">>> totalPowerDelegate", totalPowerDelegate);
    console.log(">>> length", Object.keys(aaveDelegates).length);

    // #########################
    // # GET stkAave DELEGATES #
    // #########################

    const delegateEventStkAave: any =
    await bigQueryProvider.getEvents<delegateEventArgs>(
      {
        eventABI: delegateEventABI,
        contractAddress: stkAaveTokenContract,
      }
    );

    const stkAaveContract = new ethers.Contract(
      stkAaveTokenContract,
      getPowerAtBlockABI,
      jsonRPCProvider
    );

    for (const event of delegateEventStkAave) {
      stkAaveDelegations[event.delegator] = stkAaveDelegations[event.delegator] 
      ? [...stkAaveDelegations[event.delegator], {"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}]
      : [{"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}];
    }

    console.log(">>> info of: 0x2079C29Be9c8095042edB95f293B5b510203d6cE")
    console.log(stkAaveDelegations["0x2079C29Be9c8095042edB95f293B5b510203d6cE"])

    for(const [address, info] of Object.entries(stkAaveDelegations)) {

      const lastDelegations: any = {};

      info.forEach(info => {
        const type = info.delegationType;
        if (!lastDelegations[type] || info.blockNumber > lastDelegations[type].blockNumber) {
          lastDelegations[type] = info;
        }
      });


      // if the address has delegated is voting power or is proposition power to aaavechan
      if(lastDelegations[0]?.delegatee === aavechanAddress || lastDelegations[1]?.delegatee === aavechanAddress) {
        let lastDelegation;
        // in the case where an address have a voting power and a proposition power different from each other
        // e.g. A has delegated his voting power to B and B has delegated his proposition power to C (B still has his voting power but not his proposition power)
        // if the address has delegated both his voting power and his proposition power
        let power;
        if(lastDelegations[0] && lastDelegations[1]) {
          // get the power at the block before the delegation
          const powerType0 = await stkAaveContract.getPowerAtBlock(address, lastDelegations[0].blockNumber-1, 0);
          const powerType1 = await stkAaveContract.getPowerAtBlock(address, lastDelegations[1].blockNumber-1, 1);
          // take the max power
          if(BigNumber.from(powerType0).gte(BigNumber.from(powerType1))) {
            lastDelegation = lastDelegations[0];
            power = powerType0;
          }
          else {
            lastDelegation = lastDelegations[1];
            power = powerType1;
          }
        }
        // if the address has delegated only his voting power or only his proposition power
        else {
          lastDelegation = lastDelegations[0] ? lastDelegations[0] : lastDelegations[1];
          // get the power at the block before the delegation
          power = await stkAaveContract.getPowerAtBlock(address, lastDelegation.blockNumber-1, 1);
        }

        stkAaveDelegates[address] = BigNumber.from(power).div(decimals).toString();
        totalPowerDelegate += BigNumber.from(power).div(decimals).toNumber();
      }
      

      // // if the address has delegated is voting power or is proposition power to aaavechan
      // if(lastDelegations[0]?.delegatee === aavechanAddress || lastDelegations[1]?.delegatee === aavechanAddress) {
      //   const lastDelegation = lastDelegations[0] ? lastDelegations[0] : lastDelegations[1];
      //   // get his power at the block before the delegation
      //   const power = await stkAaveContract.getPowerAtBlock(address, lastDelegation.blockNumber-1, 1);
      //   // if(address === "0x2079C29Be9c8095042edB95f293B5b510203d6cE") {
      //   //   console.log(">>> FOUUUUUUND");
      //   //   console.log(">>> power", power);
      //   // }
      //   stkAaveDelegates[address] = BigNumber.from(power).div(decimals).toString();
      //   totalPowerDelegate += BigNumber.from(power).div(decimals).toNumber();
      // }
    }


    // const stkAaveDelegatesArray = Object.entries(stkAaveDelegates);

    // const delegatees : FetchedData = {};

    const delegatees = dataOperators.Union([aaveDelegates, stkAaveDelegates], UnionOption.Sum);
    // remove aavechan address from the delegatees object
    delete delegatees[aavechanAddress];

    console.log(">>> TOTAL POWER DELEGATED", totalPowerDelegate);
    console.log(">>> LENGTH", Object.keys(stkAaveDelegates).length);

    // compute the sum of the value of the delegatees object
    let total = 0;
    for(const value of Object.values(delegatees)) {
      total += BigNumber.from(value).toNumber();
    }

    console.log(">>> TOTAL", total);

    // for(const [address, value] of Object.entries(aaveDelegates)) {
    //   if(stkAaveDelegates[address]) {
    //     delegatees[address] = BigNumber.from(aaveDelegates[address]).add(BigNumber.from(stkAaveDelegates[address])).toString();
    //   } else {
    //     // console.log(">>> UNIQUE address", address);
    //     delegatees[address] = aaveDelegates[address];
    //   }
    // }


    return [
      {
        name: "aavechan-aave-delegates",
        timestamp: context.timestamp,
        description:
          "Aave-chan Aave and stkAave delegates",
        specs:
          "Group consist of all Aave-chan Aave and stkAave delegates",
        data: delegatees,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
