import { BigNumber, ethers } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Operator, Thresholds } from "@group-generators/helpers/data-operators/map-thresholds";
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
    
    type Delegation = {
      blockNumber: number;
      delegatee: string;
      delegationType: number;
    }
    
    type DelegationsEntry = {
      [address: string]: Delegation[];
    }
  
    const aavechanAddress = "0x329c54289Ff5D6B7b7daE13592C6B1EDA1543eD4"

    const aaveTokenContract = "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9";
    const stkAaveTokenContract = "0x4da27a545c0c5B758a6BA100e3a049001de870f5";

    const getDelegators = async (contract: ethers.Contract, events: any): Promise<FetchedData> => {
      const delegations : DelegationsEntry = {};
      const delegators: FetchedData = {};

      // group the events by delegator
      for (const event of events) {
        delegations[event.delegator] = delegations[event.delegator] 
        ? [...delegations[event.delegator], {"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}]
        : [{"blockNumber": event.block_number, "delegatee": event.delegatee, "delegationType": event.delegationType}];
      }
  
      // Aave and stkAave token decimals
      const tokenDecimals = BigNumber.from(10).pow(18);
  
      for(const [address, info] of Object.entries(delegations)) {
  
        const lastDelegations: any = {};
  
        // get the last delegation for each type of delegation
        info.forEach(info => {
          const type = info.delegationType;
          if (!lastDelegations[type] || info.blockNumber > lastDelegations[type].blockNumber) {
            lastDelegations[type] = info;
          }
        });
  
        // if the address has delegated its voting power or its proposition power to aavechan
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
            power = await contract.getPowerAtBlock(address, lastDelegation.blockNumber-1, 1);
          }

          delegators[address] = BigNumber.from(power).div(tokenDecimals).toString();
        }
      }
      return delegators;
    };

    // #######################
    // # GET AAVE DELEGATORS #
    // #######################

    const delegateEventABI = "event DelegateChanged(address indexed delegator, address indexed delegatee, uint8 delegationType)"
    type delegateEventArgs = {
      delegator: string;
      delegatee: string;
      delegationType: any;
    };

    const aaveDelegateEvents: any =
    await bigQueryProvider.getEvents<delegateEventArgs>(
      {
        eventABI: delegateEventABI,
        contractAddress: aaveTokenContract,
      }
    );

    const jsonRPCProvider = new JsonRpcProvider(process.env.JSON_RPC_URL);

    const getPowerAtBlockABI =[
      "function getPowerAtBlock(address user, uint256 blockNumber, uint8 delegationType) external view returns (uint256)"
    ];

    const aaveContract = new ethers.Contract(
        aaveTokenContract,
        getPowerAtBlockABI,
        jsonRPCProvider
    );

    const aaveDelegators = await getDelegators(aaveContract, aaveDelegateEvents);

    // ##########################
    // # GET STKAAVE DELEGATORS #
    // ##########################

    const stkAaveDelegateEvents: any =
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

    const stkaaveDelegators = await getDelegators(stkAaveContract, stkAaveDelegateEvents);

    // ####################
    // # UNION THE GROUPS #
    // ####################

    const delegators = dataOperators.Union([aaveDelegators, stkaaveDelegators], UnionOption.Sum);
    
    // remove aavechan address from the delegatees object
    delete delegators[aavechanAddress];

    // filter the delegators by thresholds
    const thresholds: Thresholds = {
      operator: Operator.LTE,
      values: [
        { old: 1000, new: 3 },
        { old: 10, new: 2 },
        { old: 1, new: 1 }
      ]
    };
    const filteredDelegators = dataOperators.MapThresholds(delegators, thresholds);

    return [
      {
        name: "aavechan-aave-delegators",
        timestamp: context.timestamp,
        description:
          "Aave-chan Aave and stkAave delegators",
        specs:
          "Group consist of all Aave-chan Aave and stkAave delegators",
        data: filteredDelegators,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
