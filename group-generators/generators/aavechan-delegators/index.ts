import { BigNumber, ethers } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
import { BigQueryProvider } from "@group-generators/helpers/data-providers/big-query";
import { JsonRpcProvider } from "@group-generators/helpers/data-providers/json-rpc";
import { ValueType, GroupWithData, FetchedData, Tags } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

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

    const blockNumberSnapshot = 17563020;

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
          const balance = await contract.balanceOf(address, {
            blockTag: +blockNumberSnapshot,
          });
          delegators[address] = BigNumber.from(balance).div(tokenDecimals).toString();
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

    let aaveDelegateEvents: any =
    await bigQueryProvider.getEvents<delegateEventArgs>(
      {
        eventABI: delegateEventABI,
        contractAddress: aaveTokenContract,
      }
    );

    aaveDelegateEvents = aaveDelegateEvents.filter((event: any) => event.block_number < blockNumberSnapshot);

    const jsonRPCProvider = new JsonRpcProvider(process.env.JSON_RPC_URL);

    const getBalanceAtBlockABI =[
      "function balanceOf(address account) external view returns (uint256)"
    ];

    const aaveContract = new ethers.Contract(
        aaveTokenContract,
        getBalanceAtBlockABI,
        jsonRPCProvider
    );

    const aaveDelegators = await getDelegators(aaveContract, aaveDelegateEvents);

    // ##########################
    // # GET STKAAVE DELEGATORS #
    // ##########################

    let stkAaveDelegateEvents: any =
    await bigQueryProvider.getEvents<delegateEventArgs>(
      {
        eventABI: delegateEventABI,
        contractAddress: stkAaveTokenContract,
      }
    );

    stkAaveDelegateEvents = stkAaveDelegateEvents.filter((event: any) => event.block_number < blockNumberSnapshot);

    const stkAaveContract = new ethers.Contract(
      stkAaveTokenContract,
      getBalanceAtBlockABI,
      jsonRPCProvider
    );

    const stkaaveDelegators = await getDelegators(stkAaveContract, stkAaveDelegateEvents);

    // ####################
    // # UNION THE GROUPS #
    // ####################

    const delegators = dataOperators.Union([aaveDelegators, stkaaveDelegators], UnionOption.Sum);
    
    // remove aavechan address from the delegatees object
    delete delegators[aavechanAddress];

    return [
      {
        name: "aavechan-delegators",
        timestamp: context.timestamp,
        description:
          "Data Group of all Aave-chan delegators",
        specs:
          "Contains all Aave-chan delegators. Tokens taken into account: • Aave • stkAave. The value of each group member corresponds to their number of tokens delegated rounded down.",
        data: delegators,
        valueType: ValueType.Score,
        tags: [Tags.Maintained],
      },
    ];
  },
};

export default generator;
