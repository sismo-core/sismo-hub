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

    // let aaveDelegates: FetchedData = {};
    // const stkAaveDelegates: FetchedData = {};

    // const delegations : DelegationsEntry = {};
    // const stkAaveDelegations : DelegationsEntry = {};
    
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

    const getDelegates = async (contract: ethers.Contract, events: any): Promise<FetchedData> => {
      const delegations : DelegationsEntry = {};
      const delegates: FetchedData = {};

      for (const event of events) {
        delegations[event.delegator] = delegations[event.delegator] 
        ? [...delegations[event.delegator], {"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}]
        : [{"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}];
      }
  
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
          // e.g. A has delegated his voting power to B and B has delegated his proposition power to C (B still has his voting power but not his proposition power)
          // if the address has delegated both his voting power and his proposition power
          let power;
          if(lastDelegations[0] && lastDelegations[1]) {
            // get the power at the block before the delegation
            const powerType0 = await contract.getPowerAtBlock(address, lastDelegations[0].blockNumber-1, 0);
            const powerType1 = await contract.getPowerAtBlock(address, lastDelegations[1].blockNumber-1, 1);
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
            power = await contract.getPowerAtBlock(address, lastDelegation.blockNumber-1, 1);
          }
  
          delegates[address] = BigNumber.from(power).div(decimals).toString();
        }
      }
      return delegates;
    };

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

    const aaveDelegates = await getDelegates(aaveContract, delegateTransactions);

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

    const stkAaveDelegates = await getDelegates(stkAaveContract, delegateEventStkAave);

    // for (const event of delegateEventStkAave) {
    //   stkAaveDelegations[event.delegator] = stkAaveDelegations[event.delegator] 
    //   ? [...stkAaveDelegations[event.delegator], {"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}]
    //   : [{"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}];
    // }

    // for(const [address, info] of Object.entries(stkAaveDelegations)) {

    //   const lastDelegations: any = {};

    //   info.forEach(info => {
    //     const type = info.delegationType;
    //     if (!lastDelegations[type] || info.blockNumber > lastDelegations[type].blockNumber) {
    //       lastDelegations[type] = info;
    //     }
    //   });

    //   // if the address has delegated is voting power or is proposition power to aaavechan
    //   if(lastDelegations[0]?.delegatee === aavechanAddress || lastDelegations[1]?.delegatee === aavechanAddress) {
    //     let lastDelegation;
    //     // in the case where an address have a voting power and a proposition power different from each other
    //     // e.g. A has delegated his voting power to B and B has delegated his proposition power to C (B still has his voting power but not his proposition power)
    //     // if the address has delegated both his voting power and his proposition power
    //     let power;
    //     if(lastDelegations[0] && lastDelegations[1]) {
    //       // get the power at the block before the delegation
    //       const powerType0 = await stkAaveContract.getPowerAtBlock(address, lastDelegations[0].blockNumber-1, 0);
    //       const powerType1 = await stkAaveContract.getPowerAtBlock(address, lastDelegations[1].blockNumber-1, 1);
    //       // take the max power
    //       if(BigNumber.from(powerType0).gte(BigNumber.from(powerType1))) {
    //         lastDelegation = lastDelegations[0];
    //         power = powerType0;
    //       }
    //       else {
    //         lastDelegation = lastDelegations[1];
    //         power = powerType1;
    //       }
    //     }
    //     // if the address has delegated only his voting power or only his proposition power
    //     else {
    //       lastDelegation = lastDelegations[0] ? lastDelegations[0] : lastDelegations[1];
    //       // get the power at the block before the delegation
    //       power = await stkAaveContract.getPowerAtBlock(address, lastDelegation.blockNumber-1, 1);
    //     }

    //     stkAaveDelegates[address] = BigNumber.from(power).div(decimals).toString();
    //   }
    // }

    const delegatees = dataOperators.Union([aaveDelegates, stkAaveDelegates], UnionOption.Sum);
    // remove aavechan address from the delegatees object
    delete delegatees[aavechanAddress];

    // compute the sum of the value of the delegatees object
    let total = 0;
    for(const value of Object.values(delegatees)) {
      total += BigNumber.from(value).toNumber();
    }

    console.log(">>> TOTAL", total);

    const filteredDelegatees: FetchedData = {};

    const thresholds = [
      { min: 1000, newValue: 5 },
      { min: 100, newValue: 4 },
      { min: 10, newValue: 3 },
      { min: 1, newValue: 2 },
      { min: 0, newValue: 1 },
    ];

    // Sort thresholds in descending order
    thresholds.sort((a, b) => b.min - a.min);
    
    for (const [address, value] of Object.entries(delegatees)) {
      const valueNumber = BigNumber.from(value).toNumber();
      // console.log(">>> VALUE", valueNumber);
    
      for (const threshold of thresholds) {
        if (valueNumber >= threshold.min) {
          filteredDelegatees[address] = threshold.newValue;
          break;
        }
      }
    }

    return [
      {
        name: "aavechan-aave-delegates",
        timestamp: context.timestamp,
        description:
          "Aave-chan Aave and stkAave delegates",
        specs:
          "Group consist of all Aave-chan Aave and stkAave delegates",
        data: filteredDelegatees,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
